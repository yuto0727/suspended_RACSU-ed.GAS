function test() {
  const db_ctrl = SSheetDB.open(db_id.ctrl);
  const db_task = SSheetDB.open(db_id.task);
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const lc_admin = new LineBotSDK.Client({channelAccessToken:acc_token.admin});

  const user_id = "U5a2991011c7a349ab5c5bebc4347cfb6";
  lc_main.pushMessage(user_id, [{
    "type": "text",
    "text": "初期設定が完了しました。"
  },{
    "type": "text",
    "text": "課題の取得処理中です。\nしばらくお待ち下さい。"
  }]);
}

function test2(){
  for (let i=0; i<4; i++){
    const a = 1
    console.log(a)
  }
}
