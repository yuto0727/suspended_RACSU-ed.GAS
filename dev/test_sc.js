

function test() {
  const db_ctrl = SSheetDB.open(db_id.ctrl);
  const db_task = SSheetDB.open(db_id.task);
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const lc_admin = new LineBotSDK.Client({channelAccessToken:acc_token.admin});
  const user_id = "U5a2991011c7a349ab5c5bebc4347cfb6";

  // process_start_task_auto_get(lc_main, db_ctrl, db_task, user_id);

  // lc_main.pushMessage(user_id, [{
  //   "type":"text", 
  //   "text":`g`
  // },{
  //   "type":"text", 
  //   "text":`a`
  // }]);

  // delete_task_sheet(user_id)
}






