function send_test_message(){
  const db_ctrl = SSheetDB.open(db_id.ctrl);
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const user_id = admin_id.main;

  lc_main.multicast([user_id, "Udc2a7e399fb293c76da3f67c561ad7cb"], [{
    "type": "flex",
    "altText": "課題追加フォーム",
    "contents": contents
  }]);
}

function send_all_user(){
  const db_ctrl = SSheetDB.open(db_id.ctrl);
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const user_id_all = get_all_user_id(db_ctrl);

  console.log(user_id_all)

  lc_main.multicast(user_id_all, [{
    "type": "flex",
    "altText": "送信テスト",
    "contents": contents
  }]);
}

const contents = {
    "type": "bubble",
    "size": "giga",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "信州大学生専用",
          "color": "#1b5aad",
          "size": "sm",
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "課題一覧確認サービスRACSU",
          "color": "#1b5aad",
          "size": "md",
          "weight": "bold"
        }
      ],
      "paddingBottom": "none"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "課題の手動追加が\n利用可能になりました！",
              "size": "xl",
              "align": "center",
              "color": "#ff3d3d",
              "weight": "bold",
              "margin": "md",
              "wrap": true
            },
            {
              "type": "text",
              "text": "下部メニュー、中央下のアイコンを\nタップして利用できます。",
              "wrap": true,
              "margin": "md",
              "align": "center"
            }
          ],
          "paddingAll": "lg",
          "borderColor": "#1b5aad",
          "borderWidth": "medium",
          "cornerRadius": "md"
        }
      ],
      "paddingAll": "xl"
    }
  }


