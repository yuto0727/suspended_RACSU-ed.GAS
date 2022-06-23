function setTrigger(){
  // ユーザーには8～21時orなしで設定してもらう
  var set_time_all = read_excel_value_all_rownum("ID", 9).flat();
  var userName_all = read_excel_value_all_rownum("ID", 2).flat();

  // 前日分のトリガー削除
  delTrigger()

  // 期限切れの課題を削除
  for (var i = 0, len = userName_all.length; i < len; i++){
    makeFinishFlag_PastTask(userName_all[i])
  }

  // 重複を削除
  var set_time_edited = Array.from(new Set(set_time_all))

  const time = new Date();

  for (var i = 0, len = set_time_edited.length; i < len; ++i){
    if (set_time_edited[i] !== "通知しない"){
      time.setHours(Number(set_time_edited[i].split("-")[0]));
      time.setMinutes(00);
      // それぞれの時間にトリガー設定
      ScriptApp.newTrigger("runTimer").timeBased().at(time).create();
      console.log("set at:", time)
    }else{
      // 「通知しない」場合は取得だけする

      for (var j = 2; j <= 5; j += 3) {
        if (read_excel_value("ID", alphabet[j]+(i+1).toString()) !== ""){
          var category = read_excel_value("ID", alphabet[j]+(i+1).toString());
          var userid = read_excel_value("ID", alphabet[j+1]+(i+1).toString());
          var authtoken = read_excel_value("ID", alphabet[j+2]+(i+1).toString());

          console.log(userName_all[i], category, userid, authtoken);
          getTask(userName_all[i], userid, authtoken, category);
        };
      };
    };
  };
}

function delTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "runTimer"){
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

function runTimer(){
  var userName_all = read_excel_value_all_rownum("ID", 2).flat();
  var userId_all = read_excel_value_all_rownum("ID", 1).flat();
  var set_time_all = read_excel_value_all_rownum("ID", 9).flat();

  var this_hour =  Number(new Date().getHours());

  for (var i = 0, len = set_time_all.length; i < len; ++i){
    var message_added = "";

    if (set_time_all[i] !== "通知しない" && Number(set_time_all[i].split("-")[0]) == this_hour){
      for (var j = 2; j <= 5; j += 3) {
        if (read_excel_value("ID", alphabet[j]+(i+1).toString()) !== ""){
          var category = read_excel_value("ID", alphabet[j]+(i+1).toString());
          var userid = read_excel_value("ID", alphabet[j+1]+(i+1).toString());
          var authtoken = read_excel_value("ID", alphabet[j+2]+(i+1).toString());

          console.log(userName_all[i], category, userid, authtoken)
          getTask(userName_all[i], userid, authtoken, category);
          message_added = "\n（自動取得実行済み）";
        };
      };

      sendMessage([_tasklist(userName_all[i]), _text("【定期連絡】\n現在登録済みの課題一覧です。"+message_added)], [userId_all[i]]);
      console.log(userName_all[i], "に送信しました。")
    };
  };
}

