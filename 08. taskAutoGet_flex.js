function _flex_taskAutoGet(message_number) {
  var flex_01 = {
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
          "text": "信大ACSUとの連携設定①",
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
          "text": "こちらは信大Webサイト「ACSU」との連携ガイドです。",
          "wrap": true
        },
        {
          "type": "text",
          "text": "連携をすると、eAlpsに登録された課題を自動で通知できます。",
          "wrap": true,
          "margin": "md"
        },
        {
          "type": "text",
          "text": "※設定は「やめる」と送信するといつでも中断できます。",
          "wrap": true,
          "margin": "md",
          "weight": "bold"
        }
      ]
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
              "type": "button",
              "action": {
                "type": "message",
                "label": "次のステップへ",
                "text": "ステップ2へ"
              },
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#1b5aad",
          "cornerRadius": "md"
        }
      ]
    }
  }

  var flex_02 = {
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
          "text": "信大ACSUとの連携設定②",
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
          "text": "「共通教育」と「専門教育」の2つの設定をします。",
          "wrap": true,
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "共通の手順を説明します。",
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
              "type": "button",
              "action": {
                "type": "message",
                "label": "次のステップへ",
                "text": "ステップ3へ"
              },
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#1b5aad",
          "cornerRadius": "md"
        }
      ]
    }
  }

  var flex_03 = {
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
          "text": "信大ACSUとの連携設定③",
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
          "text": "①URLからACSUにログイン",
          "wrap": true,
          "weight": "bold",
          "margin": "lg"
        },
        {
          "type": "text",
          "text": "②下記画像のように選択",
          "wrap": true,
          "weight": "bold",
          "margin": "lg"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "image",
              "size": "full",
              "aspectMode": "fit",
              "url": "https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/278353/5cbb1f9e-74c8-535f-604e-aac365419a8b.jpeg"
            }
          ],
          "borderColor": "#1b5aad",
          "borderWidth": "normal",
          "margin": "md"
        },
        {
          "type": "text",
          "text": "③下記画像に従ってURLをコピー",
          "wrap": true,
          "weight": "bold",
          "margin": "30px"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "image",
              "size": "full",
              "aspectMode": "fit",
              "url": "https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/278353/29daff10-9bea-0d49-712a-cea24dbd0f51.jpeg"
            }
          ],
          "borderColor": "#1b5aad",
          "borderWidth": "normal",
          "margin": "md"
        },
        {
          "type": "text",
          "text": "④このトークにURLを送信",
          "wrap": true,
          "weight": "bold",
          "margin": "30px"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "image",
              "size": "full",
              "aspectMode": "fit",
              "url": "https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/278353/56a1be1a-911b-198e-0a46-0e88484fea87.jpeg"
            }
          ],
          "borderColor": "#1b5aad",
          "borderWidth": "normal",
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
              "type": "text",
              "text": "手順を理解したので\n「共通教育」の設定をする",
              "size": "md",
              "color": "#ffffff",
              "wrap": true,
              "align": "center",
              "action": {
                "type": "message",
                "text": "ステップ4へ"
              }
            }
          ],
          "backgroundColor": "#1b5aad",
          "cornerRadius": "md",
          "action": {
            "type": "message",
            "label": "action",
            "text": "hello"
          },
          "paddingAll": "md"
        }
      ]
    }
  }

  var flex_04 = {
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
          "text": "信大ACSUとの連携設定④",
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
          "text": "下記ボタンからアクセスして、URLをコピーし送信してください。",
          "wrap": true,
          "weight": "bold"
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
              "type": "button",
              "action": {
                "type": "uri",
                "label": "共通教育URLにアクセスする",
                "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/g/calendar/export.php"
              },
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#1b5aad",
          "cornerRadius": "md"
        }
      ]
    }
  }

  var flex_05 = {
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
          "text": "信大ACSUとの連携設定⑤",
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
          "text": "続いて「専門教育」の設定です。",
          "wrap": true,
          "weight": "bold"
        },
        {
          "type": "text",
          "text": "※手順は共通教育と同様です。",
          "wrap": true,
          "weight": "bold",
          "margin": "md",
          "decoration": "underline",
          "size": "md",
          "color": "#ff0000"
        },
        {
          "type": "text",
          "text": "あなたの学部を選択し、先程と同じ手順でURLを送信してください。",
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
                        "type": "uri",
                        "label": "人文学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/l/calendar/export.php"
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
                        "type": "uri",
                        "label": "教育学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/e/calendar/export.php"
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
                        "type": "uri",
                        "label": "経法学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/j/calendar/export.php"
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
                        "type": "uri",
                        "label": "理学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/s/calendar/export.php"
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
                        "type": "uri",
                        "label": "医学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/m/calendar/export.php"
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
                        "type": "uri",
                        "label": "工学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/t/calendar/export.php"
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
                        "type": "uri",
                        "label": "農学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/a/calendar/export.php"
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
                        "type": "uri",
                        "label": "繊維学部",
                        "uri": "https://lms.ealps.shinshu-u.ac.jp/2022/f/calendar/export.php"
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

  var flex_06 = {
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
          "text": "信大ACSUとの連携設定⑥",
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
          "text": "以上で設定は完了です！",
          "wrap": true,
          "weight": "bold",
          "size": "lg"
        },
        {
          "type": "text",
          "text": "毎日自動で新規課題を取得し、通知します！",
          "wrap": true,
          "margin": "md",
          "color": "#ff0000",
          "decoration": "underline"
        },
        {
          "type": "text",
          "text": "メニュー左下「今すぐ課題取得」から課題を取得できます。",
          "wrap": true,
          "margin": "md"
        },
        {
          "type": "text",
          "text": "メニュー右下「ユーザー設定」より自動通知の時間を変更できます。",
          "wrap": true,
          "margin": "md",
          "color": "#ff0000",
          "decoration": "underline"
        },
        {
          "type": "text",
          "text": "初期値は「8:00に送信です」。\n「通知しない」こともできます。",
          "wrap": true,
          "margin": "md"
        },
        {
          "type": "text",
          "text": "↓ こちらからも操作できます ↓",
          "wrap": true,
          "margin": "xl",
          "align": "center"
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
              "type": "button",
              "action": {
                "type": "message",
                "label": "課題を取得してみる！",
                "text": "今すぐ課題取得"
              },
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#1b5aad",
          "cornerRadius": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "リマインド時間を変更する",
                "text": "リマインダの設定"
              },
              "color": "#ffffff"
            }
          ],
          "backgroundColor": "#1b5aad",
          "cornerRadius": "md",
          "margin": "sm"
        }
      ]
    }
  }

  if (message_number == 1){
    var contents = flex_01;
  }else  if (message_number == 2){
    var contents = flex_02;
  }else  if (message_number == 3){
    var contents = flex_03;
  }else  if (message_number == 4){
    var contents = flex_04;
  }else  if (message_number == 5){
    var contents = flex_05;
  }else  if (message_number == 6){
    var contents = flex_06;
  }

  var data = {
      "type": "flex",
      "altText": "連携設定マニュアル"+message_number.toString(),
      "contents": contents,
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }

  return data;
}
