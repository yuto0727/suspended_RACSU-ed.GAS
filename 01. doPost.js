function doPost(e) {
  var webhookData = JSON.parse(e.postData.contents).events[0];
  var type = webhookData.type;
  var replyToken = webhookData.replyToken;
  var userID = webhookData.source.userId;



  // --------------------------------------------------------------------------------------------
  // メンテナンス時切り離し
  // var Maintenance ＝true;に変更
  // --------------------------------------------------------------------------------------------
  var Maintenance = false;




  // 友達追加時
  if (type == "follow"){
    // ID記録
    write_excel_value_append("ID", [userID]);
    sendMessage([_text("追加ありがとうございます。\n信大Webサイト「ACSU」と連携して、講義の課題の通知を行います。"), _text("ユーザー登録を行います。\nはじめにあなたの名前を送信してください。")], replyToken, method="reply");
  }

  // ブロック時
  if (type == "unfollow"){
    var userName = getuserName(userID)
    delete_sheet(userName+"_課題表");
    delete_index("ID", userID);
  }

  // メッセージ受信時
  if (type == "message"){
    var message = webhookData.message.text;
    var userName = getuserName(userID);

    // 追加直後の場合 → ユーザーネーム設定
    if (userName == ""){
      if (userName == "ユーザー設定" || userName == "課題一覧を送信" || userName == "今すぐ課題取得" || userName == "タスクを追加"){
        sendMessage([_text("あなたの名前を送信してください。")], replyToken, method="reply")
        return;
      }
      var userName = message;
      sendMessage([_text(userName+"さん、ユーザーを登録しました。"), _text("続いて、ACSUとの連携設定を行ってください。\n所要時間は5分程度です。"), _flex_taskAutoGet(1)], replyToken, method="reply");
      
      // 個人シート作成
      const hyper_link_A = `https://docs.google.com/spreadsheets/d/${sheet_id}/edit#gid=688801315`;
      make_sheet(userName+"_課題表");
      write_excel_value_append(userName+"_課題表", [`=HYPERLINK("${hyper_link_A}","ID-A")`,	"ID-B",	"講義名",	"課題名",	"提出月",	"提出日",	"提出時",	"ソート値",	"完了報告"]);

      // ユーザー名記録・ハイパーリンク設定
      const id = get_excel_sheetid(userName+"_課題表");
      const hyper_link_B = `https://docs.google.com/spreadsheets/d/${sheet_id}/edit#gid=${id}`;
      
      // すでにIDは記録済みなので、その行に追記
      const rawNum = read_excel_value_all_rownum("ID", 1).flat().indexOf(userID)+1;
      write_excel_value("ID", "b"+rawNum.toString(), `=HYPERLINK("${hyper_link_B}","${userName}")`);
      write_excel_value("ID", "i"+rawNum.toString(), "8-00");

    // --------------------------------------------------------------------------------------------
    //                                   メッセージ処理部
    // --------------------------------------------------------------------------------------------


    // --------------------------------------------------------------------------------------------
    // メンテナンス
    // --------------------------------------------------------------------------------------------
    }else if (Maintenance && userID !== userID_admin){
      sendMessage([_text("現在メンテナンス中です。")], replyToken, method="reply");
      return;

    // --------------------------------------------------------------------------------------------
    // 課題一覧を送信
    // --------------------------------------------------------------------------------------------
    }else if(message == "課題一覧を送信"){
      var userName = getuserName(userID);
      sendMessage([_tasklist(userName)], replyToken, method="reply");
    
    // --------------------------------------------------------------------------------------------
    // ユーザー設定
    // --------------------------------------------------------------------------------------------
    }else if(message == "ユーザー設定"){
      sendMessage([_otherMenu()], replyToken, method="reply");
    }else if(message == "リマインダの設定"){
      var userNo = getuserNumber(userID);
      userNo += 1;
      var set_time = read_excel_value("ID", "I"+userNo.toString()).replace("-", ":").replace(":00", ":00に送信");
      sendMessage([_config_reminder(set_time)], replyToken, method="reply");
    }else if(message.indexOf(":00に送信") !== -1 || message == "通知しない"){
      var userNo = getuserNumber(userID);
      userNo += 1;
      if (message !== "通知しない"){
        var set_time = message.replace("に送信", "").replace(":", "-");
        write_excel_value("ID", "I"+userNo.toString(), set_time);
      }else{
        write_excel_value("ID", "I"+userNo.toString(), message);
      }
      sendMessage([_text(`「${message}」に変更しました。\n設定は明日から反映されます。`)], replyToken, method="reply");
    }else if(message == "ユーザー名変更"){
      var userName = getuserName(userID);
      sendMessage([_text("「ユーザー名変更」は後日追加予定です。しばらくお待ち下さい。")], replyToken, method="reply");
    
      
    // --------------------------------------------------------------------------------------------
    // 課題の手動追加フォームのURLを送信
    // 
    // 2022/04/15 メンテナンスメッセージに変更
    // 2022/04/25 タスクを追加に変更
    // --------------------------------------------------------------------------------------------
    }else if(message == "タスクを追加"){
      var userName = getuserName(userID);
      sendMessage([_text(`追加フォームのURLです。\nhttp://wy1.starfree.jp/RACSU/add-task?userId=${userName}`)], replyToken, method="reply");

    // --------------------------------------------------------------------------------------------
    // 課題の取得を強制実行
    // 
    // 2022/04/20 IDシートから取得に変更
    // 今すぐ課題取得に変更
    // --------------------------------------------------------------------------------------------
    }else if(message == "今すぐ課題取得"){
      sendMessage([_text("自動取得を開始します。")], [userID]);

      var userNo = getuserNumber(userID);
      var userName = getuserName(userID);
      var is_able = false;
      console.log(userNo);

      for (var j = 2; j <= 5; j += 3) {
        if (read_excel_value("ID", alphabet[j]+(userNo+1).toString()) !== ""){
          var category = read_excel_value("ID", alphabet[j]+(userNo+1).toString());
          var userid = read_excel_value("ID", alphabet[j+1]+(userNo+1).toString());
          var authtoken = read_excel_value("ID", alphabet[j+2]+(userNo+1).toString());
          console.log(userName, category, userid, authtoken)
          getTask(userName, userid, authtoken, category);

          is_able = true;
        };
      };

      if (is_able){
        sendMessage([_tasklist(userName) ,_text("自動取得を実行しました。")], replyToken, method="reply");
      }else{
        sendMessage([_text("ACSUと連携されていません。右下「ユーザー設定」より行ってください。")], replyToken, method="reply");
      };

    // --------------------------------------------------------------------------------------------
    // ACSU連携設定
    // 
    // 2022/04/15 メンテナンスメッセージに変更
    // 2022/04/15 上記解除
    // --------------------------------------------------------------------------------------------
    }else if(message == "ACSU連携設定"){
      sendMessage([_flex_taskAutoGet(1)], replyToken, method="reply");
    }else if(message == "ステップ2へ"){
      sendMessage([_flex_taskAutoGet(2)], replyToken, method="reply");
    }else if(message == "ステップ3へ"){
      sendMessage([_flex_taskAutoGet(3)], replyToken, method="reply");
    }else if(message == "ステップ4へ"){
      sendMessage([_flex_taskAutoGet(4)], replyToken, method="reply");
    }else if(message.indexOf(`https://lms.ealps.shinshu-u.ac.jp/${this_year().toString()}`) !== -1){
      // URLが送信されたとき
      var userName = getuserName(userID);
      var userNo = getuserNumber(userID)+1;
      message = message.replace(`https://lms.ealps.shinshu-u.ac.jp/${this_year().toString()}`, "").replace("calendar/export_execute.php?", "").split("&preset_what")[0];
      var category = message.split("/userid=")[0].replace("/", "");
      var userid = message.split("userid=")[1].split("&authtoken=")[0];
      var authtoken = message.split("&authtoken=")[1];

      if (testID(category, userid, authtoken) == "OK"){
        if (category == "g"){
          var text = `「共通教育」のACSU連携を開始しました！\n\nuserid:${userid}\ntoken:${authtoken.slice(0,4)}******`
          write_excel_value("ID", "C"+userNo.toString(), category);
          write_excel_value("ID", "D"+userNo.toString(), userid);
          write_excel_value("ID", "E"+userNo.toString(), authtoken);
          sendMessage([_text(text), _flex_taskAutoGet(5)], replyToken, method="reply");
        }else{
          var text = `「専門教育」のACSU連携を開始しました！\n\nuserid:${userid}\ntoken:${authtoken.slice(0,4)}******`
          write_excel_value("ID", "F"+userNo.toString(), category);
          write_excel_value("ID", "G"+userNo.toString(), userid);
          write_excel_value("ID", "H"+userNo.toString(), authtoken);
          sendMessage([_text(text), _flex_taskAutoGet(6)], replyToken, method="reply");
        }

        sendMessage([_text(userName+"さんの"+text.replace("！", "。"))], [userID_admin], method="multicast", account="admin");

      }else{
        sendMessage([_text("URLが最後まで正しくコピーされていない可能性があります。\nもう一度試して見てください。")], replyToken, method="reply");
      }

    }else if(message == "ステップ6へ"){
      var userName = getuserName(userID);
      sendMessage([_flex_taskAutoGet(6)], replyToken, method="reply");
    

    // --------------------------------------------------------------------------------------------
    // 課題の完了処理
    // --------------------------------------------------------------------------------------------
    }else if(message.indexOf('」の課題完了') !== -1){
      var taskId_a = Number(message.split("「")[1].split("」")[0])
      var userName = getuserName(userID);
      if (message.indexOf("確認済み") !== -1){
        // 完了を登録
        var text = makeFinishFlag(userName, taskId_a);
        sendMessage([_text(text)], replyToken, method="reply");

      }else if(getTaskData_fromDB(userName, taskId_a) !== "指定の課題が存在しません。"){
        // 詳細と確認メッセージ送信

        var task_data = getTaskData_fromDB(userName, taskId_a);

        sendMessage([_task_detail(task_data[2], task_data[3]), _confirm("上記課題を完了登録しますか？", `登録ID「${taskId_a}」の課題完了 - 確認済み`, "完了登録", "やめる", "やめる")], replyToken, method="reply");

      }else{
        // 指定課題がないとき
        sendMessage([_text("指定の課題が存在しません。")], replyToken, method="reply");

      };


    // --------------------------------------------------------------------------------------------
    // 「やめる」
    // --------------------------------------------------------------------------------------------
    }else if(message == "やめる"){
      sendMessage([_text(`操作を取り消しました。`)], replyToken, method="reply");
    

    // --------------------------------------------------------------------------------------------
    // その他のメッセージは管理アカウントに転送
    // --------------------------------------------------------------------------------------------
    }else{
      var userName = getuserName(userID);
      sendMessage([_text(userName+"：\n"+message)], [userID_admin], method="multicast", account="admin");
    };
  };
}