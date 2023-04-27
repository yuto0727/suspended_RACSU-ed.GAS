function update_task_data(db_ctrl, db_task, user_id){
  const user_eapls_data = get_user_ealps_data(db_ctrl, user_id);

  // 共通教育を更新
  const user_ics_A = get_user_ics("g", user_eapls_data["共通ID"], user_eapls_data["共通Token"]);
  const user_task_data_A = fix_ics_task_data(db_ctrl, user_ics_A);
  save_task(db_task, user_id, user_task_data_A);

  // 専門教育を更新
  const user_ics_B = get_user_ics(user_eapls_data["学籍番号"].slice(2,3), user_eapls_data["専門ID"], user_eapls_data["専門Token"]);
  const user_task_data_B = fix_ics_task_data(db_ctrl, user_ics_B);
  save_task(db_task, user_id, user_task_data_B);

  // データベース更新
  db_task.table(user_id).refresh();
}

function fix_ics_task_data(db_ctrl, user_ics){
  const ics_index_list = Parser.data(user_ics).from('SUMMARY:').to("DESCRIPTION:").iterate();
  const ics_date_list = Parser.data(user_ics).from('DTEND:').to('\r\n').iterate();
  const ics_code_list = Parser.data(user_ics).from('CATEGORIES:').to('\r\n').iterate();
  let task_data = [];

  for(var i = 0, len = ics_index_list.length; i < len; ++i){

    if(fix_time_code(ics_date_list[i]) == null){
      continue;
    }

    if (ics_index_list[i].indexOf("の提出期限が近づいています") !== -1){
      const task_name = ics_index_list[i].split("」の提出期限が近づいています")[0].replace("「", "");
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("の提出期限") !== -1){
      const task_name = ics_index_list[i].split("」の提出期限")[0].replace("「", "");
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("の受験可能期間の終了") !== -1){
      const task_name = ics_index_list[i].split(" の受験可能期間の終了")[0];
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("」終了") !== -1){
      const task_name = ics_index_list[i].split("」終了")[0].replace("「", "");
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf(" 要完了") !== -1){
      const task_name = ics_index_list[i].split(" 要完了")[0];
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);
    }
  }

  return task_data;
}

function fix_time_code(time_code){
  const today = new Date();
  const limit_year = Number(time_code.slice(0,4));
  const limit_month = Number(time_code.slice(4,6));
  const limit_day = Number(time_code.slice(6,8));
  const limit_time_h = Number(time_code.slice(9,11))+9;
  const limit_time_m = Number(time_code.slice(11,13));
  const limit = new Date(limit_year, limit_month-1, limit_day, limit_time_h, limit_time_m, 0);

  if (limit - today >= 0){
    return limit;
  }else{
    return null;
  }
}

function make_flex_task_data(task_data){
  const today = new Date();
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate()+1);
  let data_index, todays_task_count=0, other_task_count=0, text_color, task_data_json = [];

  // 表題追加
  task_data_json.push(
    flex.content_box_noact("horizontal", "none", [
      flex.content_text(`${Utilities.formatDate(today, 'Asia/Tokyo', 'MM/dd')}現在 登録課題一覧`, "sm", "bold", "#1DB446", 0, "none")
    ])
  );

  // セパレーター追加
  task_data_json.push(flex.content_separator("md"));

  // 当日提出の表題追加
  task_data_json.push(
    flex.content_box_noact("vertical", "md", [
      flex.content_box_noact("horizontal", "none", [
        flex.content_text("今日中に提出", "lg", "bold", "#ffa500", 0, "none")
      ])
    ])
  );

  // 当日提出の課題追加
  for (let i=0; ; i++){
    if (Utilities.formatDate(task_data[i]["提出日"], 'Asia/Tokyo', 'yyyyMMdd') == Utilities.formatDate(today, 'Asia/Tokyo', 'yyyyMMdd')){
      if (task_data[i]["完了"] == "未"){
        task_data_json.push(
          flex.content_box_doact("horizontal", "md", [
            flex.content_text("☐", "md", "regular", "#555555", 0, "none"),
            flex.content_text(Utilities.formatDate(task_data[i]["提出日"], 'Asia/Tokyo', 'HH:mm'), "md", "regular", "#ff4500", 0, "none"),
            flex.content_text(task_data[i]["講義名"].substr(0, 10), "lg", "regular", "#555555", 1, "md"),
            flex.content_text(task_data[i]["課題名"].substr(0, 7), "sm", "regular", "#555555", 0, "none")
          ], `finish@${task_data[i]["SerialID"]}`));
        todays_task_count++;

      }else{
        task_data_json.push(
          flex.content_box_doact("horizontal", "md", [
            flex.content_text("☑", "md", "regular", "#555555", 0, "none"),
            flex.content_text(Utilities.formatDate(task_data[i]["提出日"], 'Asia/Tokyo', 'HH:mm'), "md", "regular", "#bbbbbb", 0, "none"),
            flex.content_text(task_data[i]["講義名"].substr(0, 10), "lg", "regular", "#bbbbbb", 1, "md"),
            flex.content_text(task_data[i]["課題名"].substr(0, 7), "sm", "regular", "#bbbbbb", 0, "none")
          ], `redo@${task_data[i]["SerialID"]}`));
      }

    // 提出日が当日以外の場合break
    }else{
      data_index = i;
      break;
    };

    // 最後まで読み込んだ場合break
    if (i+1 == task_data.length){
      data_index = 9999999;
      break;
    };
  };

  // セパレーター追加
  task_data_json.push(flex.content_separator("lg"));

  // 今後提出の表題追加
  task_data_json.push(
    flex.content_box_noact("horizontal", "xxl", [
      flex.content_text("今後の提出予定", "lg", "bold", "#1e90ff", 0, "none")
    ])
  );

  // 今後提出の課題追加
  for (let i=data_index; ; i++){
    // 当日課題のみの場合break
    if (i == 9999999){
      break;
    }

    const limit_day_add_this_loop = Utilities.formatDate(task_data[i]["提出日"], 'Asia/Tokyo', 'MM/dd')
    let contents_temporary = [];

    // 以下、提出日が同日の間ループ
    for (; ; i++){
      // 提出日が翌日の場合に、提出時間を赤字に変更
      if (limit_day_add_this_loop == Utilities.formatDate(tomorrow, 'Asia/Tokyo', 'MM/dd')){
        text_color = "#fa8072"
      }else{
        text_color = "#555555"
      }

      if (task_data[i]["完了"] == "未"){
        contents_temporary.push(
          flex.content_box_doact("horizontal", "none", [
            flex.content_text("☐", "md", "regular", "#555555", 0, "md"),
            flex.content_text(Utilities.formatDate(task_data[i]["提出日"], 'Asia/Tokyo', 'HH/mm'), "md", "regular", text_color, 0, "sm"),
            flex.content_text(task_data[i]["講義名"].substr(0, 10), "md", "regular", "#555555", 1, "md"),
            flex.content_text(task_data[i]["課題名"].substr(0, 7), "sm", "regular", "#555555", 0, "none")
          ], `finish@${task_data[i]["SerialID"]}`)
        );
        other_task_count++;

      }else{
        contents_temporary.push(
          flex.content_box_doact("horizontal", "none", [
            flex.content_text("☑", "md", "regular", "#555555", 0, "md"),
            flex.content_text(Utilities.formatDate(task_data[i]["提出日"], 'Asia/Tokyo', 'HH/mm'), "md", "regular", "#bbbbbb", 0, "sm"),
            flex.content_text(task_data[i]["講義名"].substr(0, 10), "md", "regular", "#bbbbbb", 1, "md"),
            flex.content_text(task_data[i]["課題名"].substr(0, 7), "sm", "regular", "#bbbbbb", 0, "none")
          ], `redo@${task_data[i]["SerialID"]}`)
        );
      }

      // 最後まで読み込んだ場合break
      if (i+1 == task_data.length){
        break;
      };

      // 次の課題が別日の場合break
      if (Utilities.formatDate(task_data[i+1]["提出日"], 'Asia/Tokyo', 'MM/dd') !== limit_day_add_this_loop){
        break;
      };
    }

    // 同日課題をまとめて追加
    task_data_json.push(
      flex.content_box_noact("horizontal", "md", [
        flex.content_text(`${limit_day_add_this_loop}(${env_data.youbi[task_data[i]["提出日"].getDay()]})`, "sm", "regular", text_color, 0, "sm"),
        flex.content_box_noact("vertical", "none", contents_temporary)
      ])
    );

    // セパレーター追加
    task_data_json.push(flex.content_separator("lg"));

    // 最後まで読み込んだ場合break
    if (i+1 == task_data.length){
      break;
    };
  };

  // フッター追加
  task_data_json.push(
    flex.content_box_noact("horizontal", "md", [
      flex.content_text("該当講義名をタップで完了登録ができます。", "xs", "regular", "#aaaaaa", 0, "none")
    ])
  );

  const result = {
    "contents": task_data_json,
    "todays_task_count": todays_task_count,
    "other_task_count": other_task_count
  }
  return result;
}

function make_flex_task_input_form(){
  let task_data_json = [], contents_temporary = [];
  
}