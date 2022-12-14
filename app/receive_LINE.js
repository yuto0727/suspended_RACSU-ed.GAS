function doPost(e) {
  const webhookData = JSON.parse(e.postData.contents).events[0];
  const type = webhookData.type;
  const replyToken = webhookData.replyToken;
  const userID = webhookData.source.userId;


  // --------------------------------------------------------------------------------------------
  // メンテナンス時切り離し
  // var Maintenance ＝true;に変更
  // --------------------------------------------------------------------------------------------
  const Maintenance = false;

  // --------------------------------------------------------------------------------------------
  // LINE送信用インスタンス作成
  // --------------------------------------------------------------------------------------------
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const lc_admin = new LineBotSDK.Client({channelAccessToken:acc_token.admin});


  // --------------------------------------------------------------------------------------------
  // LINE応答処理
  // --------------------------------------------------------------------------------------------
  try{
    
    lc_main.pushMessage(user_id.admin, {type:'text', text:[12]});



  }catch(e){
    // 処理エラーの場合に通知
    lc_admin.pushMessage(user_id.admin, [{type:'text', text:`処理エラーが発生しました。\n${String(e)}`}])
  }

}