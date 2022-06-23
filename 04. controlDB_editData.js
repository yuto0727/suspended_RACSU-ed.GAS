function saveData(data){
  // 各パラメータを変数に代入
  const {user, classdata, limit, type} = data;

  var limit_month = Number(limit.split("-")[1]);
  var limit_day = Number(limit.split("-")[2].split("T")[0]);
  var limit_time = limit.split("T")[1].replace(":", "-");

  var data = [[classdata, type, [limit_month, limit_day, limit_time]]];

  saveTask(user, data);

  var text = `課題の記録が完了しました。\n\n講義名：${classdata}\n課題名：${type}\n提出期限：${limit_month}/${limit_day} ${limit_time.replace("-", ":")}`;

  sendMessage([_text(text)], [getuserId(user)]);
}

function getuserId(userName){
  var rawNum = get_excel_textRawNum("ID", 2,userName);
  var userID = read_excel_value("ID", "a"+rawNum);
  return userID;
}

function getuserName(userId){
  var rawNum = get_excel_textRawNum("ID", 1, userId);
  var userName = read_excel_value("ID", "b"+rawNum);
  return userName;
}

function getuserNumber(userId){
  var alluser = read_excel_value_all_rownum("ID", 1).flat();
  return alluser.indexOf(userId);
}

function makeFinishFlag(userName, taskId_a){
  var taskId_a_all = read_excel_value_all_rownum(userName+"_課題表", 1).flat();
  if (taskId_a_all.indexOf(taskId_a) !== -1){
    var lineNum = taskId_a_all.indexOf(taskId_a)+1;
    write_excel_value(userName+"_課題表", "i"+lineNum.toString(), "完了");
    return read_excel_value(userName+"_課題表", "c"+lineNum.toString())+"の課題を完了登録しました。\nお疲れさまでした！";
  }else{
    return "指定の課題が存在しません。"
  }
}

function getClassName_fromDB(userName, taskId_a){
  var taskId_a_all = read_excel_value_all_rownum(userName+"_課題表", 1).flat();
  if (taskId_a_all.indexOf(taskId_a) !== -1){
    var lineNum = taskId_a_all.indexOf(taskId_a)+1;
    return read_excel_value(userName+"_課題表", "c"+lineNum.toString());
  }else{
    return "指定の課題が存在しません。"
  }
}

function makeFinishFlag_PastTask(userName){

  // 当日の日付取得
  var date = new Date();
  date.setDate(date.getDate() - 1);
  var date_day = date.getDate().toString();
  var date_month = (date.getMonth()+1).toString();

  // ソート値作成
  var sort_num = Number(date_month + ("0"+date_day).slice(-2) + "2400")

  var flag_maked = read_excel_value_all_rownum(userName+"_課題表", 9).flat();

  for (var i = 2, len = flag_maked.length+1; i < len; ++i){
    if (flag_maked[i-1] == "" && Number(read_excel_value(userName+"_課題表", "h"+i.toString())) <= sort_num){
      write_excel_value(userName+"_課題表", "i"+i.toString(), "完了");
      console.log("完了")
    }

    if (Number(read_excel_value(userName+"_課題表", "h"+i.toString())) > sort_num){
      console.log("break")
      break;
    }
  }
}

