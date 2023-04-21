'use strict';

function doPost(e) {
  // --------------------------------------------------------------------------------------------
  // インスタンス作成
  // --------------------------------------------------------------------------------------------
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const lc_contact = new LineBotSDK.Client({channelAccessToken:acc_token.contact});
  const db_task = SSheetDB.open(db_id.task);
  const db_ctrl = SSheetDB.open(db_id.ctrl);


  try{
    // --------------------------------------------------------------------------------------------
    // Webhookデータ処理
    // --------------------------------------------------------------------------------------------
    const webhookData = JSON.parse(e.postData.contents).events[0];
    const type = webhookData.type;
    const user_reply_token = webhookData.replyToken;
    const user_id = webhookData.source.userId;    

    // --------------------------------------------------------------------------------------------
    // メンテナンスチェック
    // --------------------------------------------------------------------------------------------
    if (is_maintenance(db_ctrl)){
      add_ctrl_log(db_ctrl, `Webhook data received during maintenance from id:${user_id}`);
      lc_main.replyMessage(user_reply_token, {
        "type": "text",
        "text": "現在メンテナンス中です。\n時間をおいてもう一度お試しください。"
      });
      return;
    }

    // --------------------------------------------------------------------------------------------
    // メイン処理
    // --------------------------------------------------------------------------------------------
    if (type == "follow"){
      if (is_unregistered_user(db_ctrl, user_id)){
        // --------------------------------------------------------------------------------------------
        // 初回フォロー時処理
        // ・認証案内メッセージ送信
        // --------------------------------------------------------------------------------------------
        process_follow(lc_main, db_ctrl, user_id, user_reply_token);
        add_ctrl_log(db_ctrl, `Follow process completed for id:${user_id}`);

      } else {
        // --------------------------------------------------------------------------------------------
        // ブロック解除時処理
        // →未実装
        // --------------------------------------------------------------------------------------------
        process_unblock(lc_main, db_ctrl, user_id, user_reply_token);
        add_ctrl_log(db_ctrl, `Unblock process completed for id:${user_id}`);

      }

    } else if (type == "message"){
      // --------------------------------------------------------------------------------------------
      // メッセージ受信時処理
      // --------------------------------------------------------------------------------------------
      const user_message = webhookData.message.text;
      const user_status = get_user_status(db_ctrl, user_id);
      add_ctrl_log(db_ctrl, `Message from ${user_id}: ${user_message}`);

      if (user_status["認証ステータス"] == "未認証"){
        // --------------------------------------------------------------------------------------------
        // 未認証ユーザー処理
        // --------------------------------------------------------------------------------------------

        if (user_status["処理ステータス"] == "学籍番号送信待ち"){
          // --------------------------------------------------------------------------------------------
          // 学籍番号受信時処理
          // ・学籍番号の形式チェック
          // ↓
          // ・認証メールの送信
          // ・処理ステータスを認証待ちに変更
          // ・キャッシュデータに認証コードを記録
          // --------------------------------------------------------------------------------------------
          process_accept_studentnumbre(lc_main, db_ctrl, user_id, user_reply_token, user_message);
          add_ctrl_log(db_ctrl, `Accept studentnumbre process completed for id:${user_id}`);

        } else if (user_status["処理ステータス"] == "認証待ち"){
          if (user_message == "メールの再送をする"){
          // --------------------------------------------------------------------------------------------
          // 認証メール再送処理
          // ・学籍番号の登録をリセットして最初からにする
          // --------------------------------------------------------------------------------------------
          process_reset_studentnumbre(lc_main, db_ctrl, user_id, user_reply_token);
          add_ctrl_log(db_ctrl, `Reset studentnumbre process completed for id:${user_id}`);
          }
      
          // --------------------------------------------------------------------------------------------
          // 認証番号受信時処理
          // ・認証番号確認
          // ↓
          // ・処理ステータスを規約同意待ちに変更
          // ・認証ステータスを認証済みに変更
          // ・利用規約の送信
          // --------------------------------------------------------------------------------------------
          else {
          process_check_authnumber(lc_main, db_ctrl, user_id, user_reply_token, user_message);
          add_ctrl_log(db_ctrl, `Check authnumber process completed for id:${user_id}`);
          }
        }
      
      } else if (user_status["認証ステータス"] == "認証済み"){
        // --------------------------------------------------------------------------------------------
        // 認証済みユーザー処理
        // --------------------------------------------------------------------------------------------

        if (user_status["処理ステータス"] == "規約同意待ち"){
          // --------------------------------------------------------------------------------------------
          // 利用規約同意処理
          // ・同意メッセージチェック
          // ↓同意
          // ・処理ステータスを連携待ちに変更
          // ・キャッシュデータ削除
          // ・連携手順メッセージ送信
          // --------------------------------------------------------------------------------------------
          process_user_policy_agreement(lc_main, db_ctrl, user_id, user_reply_token, user_message);
          add_ctrl_log(db_ctrl, `User policy agreement process completed for id:${user_id}`);
          
        } else if (user_status["処理ステータス"] == "連携待ち"){
          // --------------------------------------------------------------------------------------------
          // ACSU連携連携処理
          // ・URL整合性チェック
          // ↓
          // ・処理ステータスを連携済みに変更
          // ・URLのパラメータ保存
          // ・課題保存用DB作成
          // --------------------------------------------------------------------------------------------
          process_set_calendar_url(lc_main, db_ctrl, db_task, user_id, user_reply_token, user_message);
          add_ctrl_log(db_ctrl, `Set calender url process completed for id:${user_id}`);
        
        } else if (user_status["処理ステータス"] == "連携済み"){
          // --------------------------------------------------------------------------------------------
          // ユーザーメッセージ処理
          // --------------------------------------------------------------------------------------------
          if (user_message == "課題を表示"){
            process_reply_task_list(lc_main, db_task, user_id, user_reply_token);
            add_ctrl_log(db_ctrl, `Send task list process completed for id:${user_id}`);
            
          } else if (user_message == "最新の課題に更新"){
            process_refresh_task(lc_main, db_ctrl, db_task, user_id, user_reply_token);
            add_ctrl_log(db_ctrl, `Refresh task process completed for id:${user_id}`);

          } else if (user_message.includes("finish@")){
            const task_id = user_message.replace("finish@", "");
            set_task_status(db_task, user_id, task_id, "済");
            process_reply_task_list(lc_main, db_task, user_id, user_reply_token);

          } else if (user_message.includes("redo@")){
            const task_id = user_message.replace("redo@", "");
            set_task_status(db_task, user_id, task_id, "未");
            process_reply_task_list(lc_main, db_task, user_id, user_reply_token);
            
          } else {
            process_transmit_message(lc_contact, db_ctrl, user_id, user_message);
          }
        }

      }

    } else if (type == "postback"){


    } else if (type == "unfollow"){
      // --------------------------------------------------------------------------------------------
      // ブロック時処理
      // →未実装
      // --------------------------------------------------------------------------------------------
      process_block(db_ctrl, user_id);
      add_ctrl_log(db_ctrl, `Block process completed for id:${user_id}`);

    } else {}

  }catch(error){
    // --------------------------------------------------------------------------------------------
    // 処理エラー時例外処理
    // ・該当ユーザーにエラーメッセージを送信
    // --------------------------------------------------------------------------------------------
    process_error(lc_contact, error, user_id);
    add_error_log(db_ctrl, error);
    add_ctrl_log(db_ctrl, `Error exception happened`);
  }
}