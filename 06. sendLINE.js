function _text(text){
  var data = {
    'type': 'text',
    'text': text
  };
  return data;
}

function _confirm(title, textA, labelA, textB, labelB) {
  var contents = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "size": "lg",
        "text": title,
        "wrap": true
      },
      {
        "type": "text",
        "text": " の課題を完了登録しますか？ ",
        "wrap": true,
        "align": "start"
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "horizontal",
    "spacing": "sm",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": labelA,
          "text": textA
        },
        "style": "secondary"
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": labelB,
          "text": textB
        },
        "style": "secondary"
      }
    ],
    "flex": 0
  }
}


  var data = {
      "type": "flex",
      "altText": "確認",
      "contents": contents,
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
  
  return data;
}

function _tasklist(username){

    // 当日の日付取得
    var today_data = new Date();
    var today_day = Number(today_data.getDate());
    var today_month = Number(today_data.getMonth()+1);

    // 翌日の日付取得
    today_data.setDate(today_data.getDate() + 1);
    var tomorrow_day = Number(today_data.getDate());
    var tomorrow_month = Number(today_data.getMonth()+1);

    // 完了フラグ取得
    var flag_finish = read_excel_value_all_rownum(username+"_課題表", 9);

    // 未完了課題格納リスト
    var task_unfinished = [];

    for(var i = 1, len = flag_finish.length; i < len; ++i){
      if (flag_finish[i] == ""){
        // 完了報告がされていない課題に適用
        task_unfinished.push(read_excel_value_all_linenum(username+"_課題表", i+1));
      };
    };
    
    // 課題リストの読み込みインデックス番号
    var list_index = 0;

    // インデックス番号の最大値
    var list_index_max = task_unfinished.length-1;

    // 課題が未登録の場合
    if (list_index_max == -1){
      return _text("課題が未登録です。");
    }

    // 送信コンテンツリスト作成
    var contents_sendable = [];

    // 表題追加
    contents_sendable.push(makeBox("horizontal", "none", [makeText(`${today_month}/${today_day}現在 登録課題一覧`, "sm", "bold", "#1DB446", 0, "none")]));

    // セパレーター追加
    contents_sendable.push(makeSeparetor("md"));

    // 当日提出の表題追加
    contents_sendable.push(makeBox("vertical", "md", [makeBox("horizontal", "none", [makeText("今日中に提出", "lg", "bold", "#ffa500", 0, "none")])]));

    while (true){
      // 提出日が当日の場合のみ追加
      if (task_unfinished[list_index][4] == today_month && task_unfinished[list_index][5] == today_day){
        // 追加用一時リスト定義
        var contents_oneTask = [];
        
        // 提出時間追加
        contents_oneTask.push(makeText(task_unfinished[list_index][6].replace("-", ":"), "md", "regular", "#ff4500", 0, "none"));

        // 講義名追加
        contents_oneTask.push(makeText(task_unfinished[list_index][2].substr(0, 5)+"…", "lg", "regular", "#555555", 1, "md"));

        // 課題形式追加
        contents_oneTask.push(makeText(task_unfinished[list_index][3].substr(0, 6)+"…", "sm", "regular", "#555555", 0, "none"));

        // Boxに変換して追加
        contents_sendable.push(makeBox_DoAction("horizontal", "md", contents_oneTask, `登録ID「${task_unfinished[list_index][0]}」の課題完了`));

        // 読み込みインデックス +1
        list_index += 1;
      }else{
        var todays_task_num = list_index;
        break;
      };
    };

    // セパレーター追加
    contents_sendable.push(makeSeparetor("lg"));

    // 今後提出の表題追加
    contents_sendable.push(makeBox("horizontal", "xxl", [makeText("今後の提出予定", "lg", "bold", "#1e90ff", 0, "none")]));

  var tomorrow_task_num = 0;

  while (true){
    var day_adding = task_unfinished[list_index][4]+task_unfinished[list_index][5];
    var contents_oneDay = [];
    while (true){
      // 以下、提出日が同日の間ループ
      
      // 追加用一時リスト定義 
      var contents_oneTask = [];

      if (task_unfinished[list_index][4] == tomorrow_month && task_unfinished[list_index][5] == tomorrow_day){
        // 提出日が翌日の場合に、提出時間を赤字に変更
        var text_color = "#fa8072"
        tomorrow_task_num += 1;
      }else{
        var text_color = "#555555"
      }

      // 提出時間追加
      contents_oneTask.push(makeText(task_unfinished[list_index][6].replace("-", ":"), "md", "regular", text_color, 0, "md"));

      // 講義名追加
      contents_oneTask.push(makeText(task_unfinished[list_index][2].substr(0, 5), "md", "regular", "#555555", 1, "md"));

      // 課題形式追加
      contents_oneTask.push(makeText(task_unfinished[list_index][3].substr(0, 6), "sm", "regular", "#555555", 0, "none"));

      // Boxに変換して追加
      contents_oneDay.push(makeBox_DoAction("horizontal", "none", contents_oneTask, `登録ID「${task_unfinished[list_index][0]}」の課題完了`));
      
      // 読み込みインデックス +1
      list_index += 1;

      // 最後まで読み込んだ場合break
      if (list_index == list_index_max+1){
        break;
      };

      // 次の課題が別日の場合break
      if (task_unfinished[list_index][4]+task_unfinished[list_index][5] !== day_adding){
        break;
      };
    }

    // 以下、同日課題のまとめ処理完了後に実
    // 上記部で作成したリストを用いて、共通の日付を付与してボックス生成
    var contents_oneDay_all = [];

    // 提出日付追加
    contents_oneDay_all.push(makeText(`${task_unfinished[list_index-1][4]}/${task_unfinished[list_index-1][5]}`, "sm", "regular", text_color, 0, "none"));

    // 課題内容追加
    contents_oneDay_all.push(makeBox("vertical", "none", contents_oneDay));

    // Boxを作って追加
    contents_sendable.push(makeBox("horizontal", "md", contents_oneDay_all));

    // セパレーター追加
    contents_sendable.push(makeSeparetor("lg"));

    // 最後まで読み込んだ場合break
    if (list_index == list_index_max+1){
      break;
    };
  };


  // フッター追加
  contents_sendable.push(makeBox("horizontal", "md", [makeText("該当講義名をタップで完了登録ができます。", "xs", "regular", "#aaaaaa", 0, "none")]));

  // 全体データ作成
  var data = {
      "type": "flex",
      "altText": `${today_month}/${today_day} 本日提出：${todays_task_num}件 明日提出：${tomorrow_task_num}件`,
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": contents_sendable
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
  };

  return data;
}

function _otherMenu(){
  var contents = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ACSU連携設定",
              "text": "ACSU連携設定"
            },
            "margin": "none"
          }
        ],
        "borderWidth": "medium",
        "borderColor": "#1e90ff",
        "cornerRadius": "md",
        "margin": "none"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "リマインダの設定",
              "text": "リマインダの設定"
            },
            "margin": "none"
          }
        ],
        "backgroundColor": "#ffffff",
        "borderWidth": "medium",
        "borderColor": "#1e90ff",
        "cornerRadius": "md",
        "margin": "md"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "ユーザー名変更",
              "text": "ユーザー名変更"
            },
            "margin": "none"
          }
        ],
        "backgroundColor": "#ffffff",
        "borderWidth": "medium",
        "borderColor": "#1e90ff",
        "cornerRadius": "md",
        "margin": "md"
      }
    ]
  }
}
  var data = {
      "type": "flex",
      "altText": "その他の設定",
      "contents": contents,
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
  
  return data;
}

function _config_reminder(now_set){
  var contents = {
    "type": "bubble",
    "size": "mega",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "課題通知サービスRACSU",
          "color": "#ffffff66",
          "size": "sm"
        },
        {
          "type": "text",
          "text": "リマインダの設定",
          "color": "#ffffff",
          "size": "xl",
          "flex": 4,
          "weight": "bold"
        }
      ],
      "paddingAll": "20px",
      "backgroundColor": "#1b5aad",
      "spacing": "md",
      "paddingTop": "22px"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "自動取得した課題を定時で通知する機能の設定です。",
          "wrap": true,
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "通知を受け取る時間、または受け取らないを選択してください。",
          "wrap": true,
          "margin": "md"
        },
        {
          "type": "text",
          "text": `現在の設定は「${now_set}」です。`,
          "wrap": true,
          "margin": "md"
        },
        {
          "type": "text",
          "text": "※「やめる」と送信すると中断できます。",
          "wrap": true,
          "margin": "lg",
          "size": "xs",
          "color": "#aaaaaa"
        }
      ],
      "paddingBottom": "none"
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "8:00に送信",
                        "text": "8:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "9:00に送信",
                        "text": "9:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "10:00に送信",
                        "text": "10:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "11:00に送信",
                        "text": "11:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "12:00に送信",
                        "text": "12:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "13:00に送信",
                        "text": "13:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "14:00に送信",
                        "text": "14:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "15:00に送信",
                        "text": "15:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "16:00に送信",
                        "text": "16:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "17:00に送信",
                        "text": "17:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "18:00に送信",
                        "text": "18:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "19:00に送信",
                        "text": "19:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "20:00に送信",
                        "text": "20:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "cornerRadius": "md",
                  "backgroundColor": "#1b5aad",
                  "offsetEnd": "xs"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "21:00に送信",
                        "text": "21:00に送信"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "通知しない",
                        "text": "通知しない"
                      },
                      "color": "#ffffff"
                    }
                  ],
                  "backgroundColor": "#1b5aad",
                  "cornerRadius": "md",
                  "offsetStart": "xs"
                }
              ],
              "paddingAll": "xs"
            }
          ]
        }
      ]
    }
  }
  var data = {
      "type": "flex",
      "altText": "リマインダの設定",
      "contents": contents,
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }
  
  return data;
}

function makeBox(layout, margin, contents){
  var content = {
                  "type": "box",
                  "layout": layout,
                  "margin": margin,
                  "contents": contents
                };
  return content;
}

function makeBox_DoAction(layout, margin, contents, actionText){
  var content = {
                  "type": "box",
                  "layout": layout,
                  "margin": margin,
                  "contents": contents,
                  "action": {
                            "type": "message",
                            "label": "action",
                            "text": actionText
                            }
                };
  return content;
}

function makeText(text, size, weight, color, flex, margin){
  var content = {
                  "type": "text",
                  "text": text,
                  "weight": weight,
                  "size": size,
                  "color": color,
                  "flex": flex,
                  "gravity": "center",
                  "margin": margin
                };
  return content;
}

function makeSeparetor(margin){
  var content = {
                  "type": "separator",
                  "margin": margin
                };
  return content;
}

function sendMessage(databody, tokenId, method="multicast", account="main") {
  var url_multicast = "https://api.line.me/v2/bot/message/multicast";
  var url_reply = "https://api.line.me/v2/bot/message/reply";

  if (method == "multicast"){
    var url = url_multicast
    if (account == "main"){
      var headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + channel_access_token_main
      };
    }else if(account == "admin"){
      var headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + channel_access_token_admin
      };
    };
    var postData = {
      "to": tokenId,
      "messages": databody
    };
  }else if(method == "reply"){
    var url = url_reply
    if (account == "main"){
      var headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + channel_access_token_main
      };
    }else if(account == "admin"){
      var headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + channel_access_token_admin
      };
    };
    var postData = {
      "replyToken": tokenId,
      "messages": databody
    };
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "muteHttpExceptions" : false,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(url, options);
}