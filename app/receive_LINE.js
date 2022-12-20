'use strict';

function doPost(e) {
  // --------------------------------------------------------------------------------------------
  // メンテナンス時切り離し
  // var Maintenance ＝true;に変更
  // --------------------------------------------------------------------------------------------
  const Maintenance = false;

  // --------------------------------------------------------------------------------------------
  // Webhookデータ処理
  // --------------------------------------------------------------------------------------------
  const webhookData = JSON.parse(e.postData.contents).events[0];
  const type = webhookData.type;
  const user_token = webhookData.replyToken;
  const user_id = user_data(webhookData.source.userId);

  // --------------------------------------------------------------------------------------------
  // インスタンス作成
  // --------------------------------------------------------------------------------------------
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const lc_admin = new LineBotSDK.Client({channelAccessToken:acc_token.admin});
  // const db_log = SSheetDB.open(db_id.log);
  const db_user = SSheetDB.open(db_id.user);

  // --------------------------------------------------------------------------------------------
  // LINE応答処理
  // --------------------------------------------------------------------------------------------
  try{
    if (type == "follow"){
      const is_exist = db_user.table("ユーザーデータ").updateCount({
        "LINE ID" : ["==", user_id]
      });
      if (is_exist == []){
        // --------------------------------------------------------------------------------------------
        // 初回フォロー時処理
        // ・認証案内メッセージ送信
        // --------------------------------------------------------------------------------------------
        process_follow(lc_main, db_user, user_id, user_token);

      } else if (is_exist !== []){
        // --------------------------------------------------------------------------------------------
        // ブロック解除時処理
        // ・
        // --------------------------------------------------------------------------------------------
        process_unblock(lc_main, db_user, user_id, user_token);

      } else {}

    } else if (type == "unfollow"){
      // --------------------------------------------------------------------------------------------
      // ブロック時処理
      // ・
      // --------------------------------------------------------------------------------------------

    } else if (type == "message"){
      // --------------------------------------------------------------------------------------------
      // メッセージ受信時処理
      // --------------------------------------------------------------------------------------------
      const user_message = webhookData.message.text;
      const user_status = get_user_status(db_user, user_id);

      if (user_status["認証ステータス"] == "認証済み"){
        // --------------------------------------------------------------------------------------------
        // 認証済みユーザー処理
        // --------------------------------------------------------------------------------------------

        if (user_status["処理ステータス"] == "連携待ち"){
          // --------------------------------------------------------------------------------------------
          // ACSU連携連携処理
          // ・連携手順メッセージ送信
          // --------------------------------------------------------------------------------------------
        } else if (user_status["処理ステータス"] == "連携済み"){

        } else {}


      } else if (user_status["認証ステータス"] == "未認証"){
        // --------------------------------------------------------------------------------------------
        // 未認証ユーザー処理
        // --------------------------------------------------------------------------------------------

        if (user_status["処理ステータス"] == "学籍番号送信待ち"){
          // --------------------------------------------------------------------------------------------
          // 学籍番号受信時処理
          // ・学籍番号の形式チェック
          // ・認証メールの送信
          // ・処理ステータスを認証待ちに変更
          // ・キャッシュデータに認証コードを記録
          // --------------------------------------------------------------------------------------------
          process_accept_studentnumbre(lc_main, db_user, user_id, user_token, user_message);

        } else if (user_status["処理ステータス"] == "認証待ち"){
          // --------------------------------------------------------------------------------------------
          // 認証番号受信時処理
          // ・認証番号確認
          // ・処理ステータスを連携待ちに変更
          // ・認証ステータスを認証済みに変更
          // --------------------------------------------------------------------------------------------
          process_check_authnumber(lc_main, db_user, user_id, user_token, user_message);
          
        } else {}
      } else {}
    } else {}

  }catch(e){
    // --------------------------------------------------------------------------------------------
    // 処理エラー時例外処理
    // ・該当ユーザーにエラーメッセージを送信
    // --------------------------------------------------------------------------------------------
    lc_admin.pushMessage(user_id.admin, [{
      "type":"text", 
      "text":`処理エラーが発生しました。\n${String(e)}`
    }])
  }
}






function process_follow(lc_main, db_user, user_id, user_token){
  const user_name = lc_main.getProfile(user_id).displayName;
  lc_main.replyMessage(user_token, [{
    "type": "flex", 
    "altText": "友達登録ありがとうございます！",
    "contents": flex.auth_guide
  }]);
  add_user(db_user, user_id, user_name);
}

function process_unblock(lc_main, db_user, user_id, user_token){

}

function process_accept_studentnumbre(lc_main, db_user, user_id, user_token, user_message){
  const user_studentnumbre = user_message.match(/\d\d[LEJSMTAF]\d\d\d\d./i);
  if (user_studentnumbre !== null){
    // 学籍番号の形式一致 -> 認証メールを送信、処理ステータスを認証待ちに変更
    const user_department = user_studentnumbre[0].match(/[LEJSMTAF]/i)[0].toLowerCase();
    const user_year = user_studentnumbre[0].match(/\d\d/i)[0];
    lc_main.replyMessage(user_token, [{
      "type": "flex", 
      "altText": "学生認証をお願いします。",
      "contents": flex.auth_guide2("21t2168a")
    }]);

    db_user.table("ユーザーデータ")
    .update({
        "入学年度": user_year,
        "学部": user_department,
        "処理ステータス": "認証待ち"
    },{
      "LINE ID" : ["==", user_id]
    });

    // ここで認証メール送信

  } else {
    // 学籍番号が不正 -> エラーメッセージ送信
    lc_main.replyMessage(user_token, {
      "type": "text",
      "text": "不正な形式の学籍番号です。正しい学籍番号を送信してください。"
    });
  }
}

function process_check_authnumber(lc_main, db_user, user_id, user_token, user_message){

}