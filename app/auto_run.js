function set_trigger(){
  // 前日分のトリガー削除
  del_trigger()

  const time = new Date();
  time.setHours(8);
  time.setMinutes(00);

  ScriptApp.newTrigger("run_timer").timeBased().at(time).create();
}

function del_trigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "run_timer"){
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

function run_timer(){
  const today = new Date();
  const db_ctrl = SSheetDB.open(db_id.ctrl);
  const db_task = SSheetDB.open(db_id.task);
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});

  const all_linked_user_id = get_all_linked_user_id(db_ctrl);

  for (let i=0; i<all_linked_user_id.length; i++){
    try{
      const user_eapls_data = get_user_ealps_data(db_ctrl, all_linked_user_id[i]["LINE ID"]);

      // 共通教育
      const user_ics_A = get_user_ics("g", user_eapls_data["共通ID"], user_eapls_data["共通Token"]);
      const user_task_data_A = fix_ics_task_data(db_ctrl, user_ics_A);
      save_task(db_task, all_linked_user_id[i]["LINE ID"], user_task_data_A);
      // 専門教育
      const user_ics_B = get_user_ics(user_eapls_data["学籍番号"].slice(2,3), user_eapls_data["専門ID"], user_eapls_data["専門Token"]);
      const user_task_data_B = fix_ics_task_data(db_ctrl, user_ics_B);
      save_task(db_task, all_linked_user_id[i]["LINE ID"], user_task_data_B);
      // 更新
      db_task.table(all_linked_user_id[i]["LINE ID"]).refresh();

      const task_data = get_all_task_unfinished(db_task, all_linked_user_id[i]["LINE ID"], today);
      if (task_data.length == 0){
        lc_main.pushMessage(all_linked_user_id[i]["LINE ID"], [{
          "type":"text",
          "text":`${Utilities.formatDate(today, 'Asia/Tokyo', 'MM/dd')}の自動同期が完了しました。`
        },{
          "type":"text",
          "text":`未完了な課題がeAlspに未登録です。\n登録され次第追加されます。`
        }]);

        console.log(`send to ${all_linked_user_id[i]["LINE ID"]}: no task`)

      } else {
        const task_data_fixed = make_flex_task_data(task_data);
        lc_main.pushMessage(all_linked_user_id[i]["LINE ID"], [{
          "type":"text",
          "text":`${Utilities.formatDate(today, 'Asia/Tokyo', 'MM/dd')}の自動同期が完了しました。\n本日提出${task_data_fixed["todays_task_count"]}件\n明日以降提出${task_data_fixed["other_task_count"]}件`
        },{
          "type": "flex",
          "altText": `${Utilities.formatDate(today, 'Asia/Tokyo', 'MM/dd')} 本日提出：${task_data_fixed["todays_task_count"]}件 明日以降提出：${task_data_fixed["other_task_count"]}件`,
          "contents": flex.task_list(task_data_fixed["contents"])
        }]);

        console.log(`send to ${all_linked_user_id[i]["LINE ID"]}: ${task_data_fixed["todays_task_count"]+task_data_fixed["other_task_count"]} task`)
      }

    }catch{
      lc_main.pushMessage(all_linked_user_id[i]["LINE ID"], [{
        "type":"text",
        "text":`Error: 送信可能課題数を超えました。`
      }]);

      console.log(`Error!: send to ${all_linked_user_id[i]["LINE ID"]}`)
    }
  }
}

