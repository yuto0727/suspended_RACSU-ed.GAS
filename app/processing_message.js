function process_follow(lc_main, db_ctrl, user_id, user_reply_token){
  const user_name = lc_main.getProfile(user_id).displayName;
  lc_main.replyMessage(user_reply_token, [{
    "type": "flex", 
    "altText": "友達登録ありがとうございます！",
    "contents": flex.auth_guide
  }]);
  add_user(db_ctrl, user_id, user_name);
}

function process_block(db_ctrl, user_id){
  // 実装時の一時機能
  // 変更予定

  erasure_user(db_ctrl, user_id);
}

function process_unblock(lc_main, db_ctrl, user_id, user_reply_token){
  // 未実装
}

function process_accept_studentnumbre(lc_main, db_ctrl, user_id, user_reply_token, user_message){
  // 受信メッセージが学籍番号の形式かチェック
  const user_studentnumbre = user_message.match(/\d\d[LEJSMTAF]\d\d\d\d./i);
  if (user_studentnumbre !== null){
    // 学籍番号の形式一致 -> 認証メールを送信、処理ステータスを認証待ちに変更
    const user_studentnumbre_lowercase = user_studentnumbre.toString().toLowerCase();
    const user_address = `${user_studentnumbre_lowercase}@shinshu-u.ac.jp`;
    const user_auth_token = make_token(6);
    lc_main.replyMessage(user_reply_token, [{
      "type": "flex", 
      "altText": "学生認証をお願いします。",
      "contents": flex.auth_guide2(user_studentnumbre_lowercase)
    }]);
    set_user_data(db_ctrl, user_id, "処理ステータス", "認証待ち");
    set_user_data(db_ctrl, user_id, "学籍番号", user_studentnumbre_lowercase);
    set_user_data(db_ctrl, user_id, "キャッシュデータ", user_auth_token);
    send_auth_email(user_address, user_auth_token);

  } else {
    // 学籍番号が不正 -> エラーメッセージ送信
    lc_main.replyMessage(user_reply_token, {
      "type": "text",
      "text": "不正な形式の学籍番号です。正しい学籍番号を送信してください。"
    });
  }
}

function process_reset_studentnumbre(lc_main, db_ctrl, user_id, user_reply_token){
  set_user_data(db_ctrl, user_id, "処理ステータス", "学籍番号送信待ち");
  set_user_data(db_ctrl, user_id, "学籍番号", "N/A");
  set_user_data(db_ctrl, user_id, "キャッシュデータ", "N/A");

  lc_main.replyMessage(user_reply_token, [{
    "type": "flex", 
    "altText": "もう一度はじめからやり直してください。",
    "contents": flex.auth_guide
  }]);
}

function process_check_authnumber(lc_main, db_ctrl, user_id, user_reply_token, user_message){
  const user_auth_token = get_user_data(db_ctrl, user_id, "キャッシュデータ");
  if (user_auth_token == user_message){
    // 認証OK
    lc_main.replyMessage(user_reply_token, [{
      "type": "text",
      "text": "認証に成功しました。"
    },{
      "type": "flex", 
      "altText": "利用規約",
      "contents": flex.user_policy(user_auth_token)
    }]);
    set_user_data(db_ctrl, user_id, "処理ステータス", "規約同意待ち");
    set_user_data(db_ctrl, user_id, "認証ステータス", "認証済み");

  } else {
    // 認証NG
    lc_main.replyMessage(user_reply_token, {
      "type": "text",
      "text": "認証コードが正しくありません。最初のアルファベットまで含めて、7文字の認証コードを送信してください"
    });
  }
}

function process_user_policy_agreement(lc_main, db_ctrl, user_id, user_reply_token, user_message){
  const user_auth_token = get_user_data(db_ctrl, user_id, "キャッシュデータ");
  const user_studentnumbre = get_user_data(db_ctrl, user_id, "学籍番号");
  const user_department = user_studentnumbre.match(/[LEJSMTAF]/i)[0];
  if (user_message == `${user_auth_token}@初期設定を開始する`){
    // 同意
    lc_main.replyMessage(user_reply_token, [{
      "type": "flex", 
      "altText": "ACSU連携手順",
      "contents": flex.link_guide(env_data.fiscal_year().toString(), user_department)
    }]);
    set_user_data(db_ctrl, user_id, "処理ステータス", "連携待ち");
    set_user_data(db_ctrl, user_id, "認証ステータス", "認証済み");
    set_user_data(db_ctrl, user_id, "キャッシュデータ", "N/A");

  } else {
    // それ以外
    lc_main.replyMessage(user_reply_token, {
      "type": "text",
      "text": "サービスを利用するためには、利用規約下部のボタンから同意してください。"
    });
  }
}


function process_set_calendar_url(lc_main, db_ctrl, db_task, user_id, user_reply_token, user_message){
  try{
    const url_param = user_message.split(/[/=&?]/);
    if (user_message.indexOf(env_data.domain) == -1 || url_param[6] !== "export_execute.php"){
      // URLエクスポート先のスクリプトが含まれるか
      throw new Error("URLの形式が不正です。正しいURLを送信してください。\n不明点はこちらまで：racsu.shinshu.univ@gmail.com");
    } else if (url_param.length !== 15){
      // URLパラメータ数が正規数含まれるか
      throw new Error("URLが最後までコピーされていない可能性があります。最後まですべてコピーして送信してください。");
    } else {
      const user_department = get_user_data(db_ctrl, user_id, "学籍番号").match(/[LEJSMTAF]/i)[0];
      const url_param_department = url_param[url_param.indexOf(env_data.fiscal_year().toString())+1];
      const url_param_userid = url_param[url_param.indexOf("userid")+1];
      const url_param_authtoken = url_param[url_param.indexOf("authtoken")+1];
      
      let url_param_department_for_check;
      if (url_param_department == "g"){
        url_param_department_for_check = "g";
      } else {
        url_param_department_for_check = user_department;
      }

      if (!is_correct_ealps_id(url_param_department_for_check, url_param_userid, url_param_authtoken)){
        // 登録済みの学部コードを使って実際にFitchしてみて、正しいデータが取れるか
        // 登録済みの学部と違うURLが送られてきた場合にエラーを出すようにする
        throw new Error("URLの有効性を確認できませんでした。正しいURLを送信してください。");
      } else {
        // すべてのエラーチェック通過

        if (url_param_department == "g"){
          set_user_data(db_ctrl, user_id, "共通ID", url_param_userid);
          set_user_data(db_ctrl, user_id, "共通Token", url_param_authtoken);
        } else {
          set_user_data(db_ctrl, user_id, "専門ID", url_param_userid);
          set_user_data(db_ctrl, user_id, "専門Token", url_param_authtoken);
        }

        if (!is_ealps_id_all_registered(db_ctrl, user_id)){
          lc_main.replyMessage(user_reply_token, {
            "type": "text",
            "text": "1つ目の登録が完了しました。続いてもう一つのURLも登録してください"
          });
          
        } else {
          // 2つとも正常追加できた場合
          // 完了メッセージ送信
          lc_main.replyMessage(user_reply_token, [{
            "type": "text",
            "text": "初期設定が完了しました。"
          },{
            "type": "text",
            "text": "課題の取得を開始しました。"
          }]);
          set_user_data(db_ctrl, user_id, "処理ステータス", "連携済み");
          process_start_task_auto_get(lc_main, db_ctrl, db_task, user_id);
        }
      }
    }
    
  } catch(error) {
    // 各エラーメッセージ送信
    const error_message = error.toString().split("Error: ")[1];
    lc_main.replyMessage(user_reply_token, {
      "type": "text",
      "text": error_message
    });
  }
}

function process_start_task_auto_get(lc_main, db_ctrl, db_task, user_id){
  make_task_sheet(db_task, user_id);
  const user_eapls_data = get_user_ealps_data(db_ctrl, user_id);

  // 共通教育
  const user_task_data_A = get_ealps_task_data(db_ctrl, "g", user_eapls_data["共通ID"], user_eapls_data["共通Token"]);
  save_task(db_task, user_id, user_task_data_A);
  // 専門教育
  const user_task_data_B = get_ealps_task_data(db_ctrl, user_eapls_data["学籍番号"].slice(2,3), user_eapls_data["専門ID"], user_eapls_data["専門Token"])
  save_task(db_task, user_id, user_task_data_B);

  lc_main.pushMessage(user_id, [{
    "type":"text", 
    "text":`課題の取得が完了しました。`
  }]);
}

function process_send_task_list(lc_main, db_ctrl, db_task, user_id, user_reply_token){
  
}

function process_error(lc_admin){
  lc_admin.pushMessage(admin_id.admin, [{
    "type":"text", 
    "text":`処理エラーが発生しました。\n${String(error)}`
  }]);
}