const flex = {
  auth_guide: {
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
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "友達登録ありがとうございます！",
              "size": "lg",
              "margin": "md",
              "align": "center"
            }
          ]
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
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "このアカウントは非公式です。\n信州大学への問い合わせは\n絶対にしないでください。",
                  "size": "lg",
                  "align": "center",
                  "color": "#ffd700",
                  "weight": "bold",
                  "wrap": true
                }
              ],
              "backgroundColor": "#000000",
              "paddingAll": "sm"
            },
            {
              "type": "text",
              "text": "はじめに、学生認証を行います",
              "size": "xl",
              "align": "center",
              "color": "#ff3d3d",
              "weight": "bold",
              "margin": "md"
            },
            {
              "type": "text",
              "text": "あなたの学籍番号をメッセージ欄に入力し、",
              "wrap": true,
              "margin": "md",
              "align": "center"
            },
            {
              "type": "text",
              "text": "送信してください 例）21T2000A",
              "align": "center"
            }
          ],
          "paddingAll": "lg",
          "borderColor": "#1b5aad",
          "borderWidth": "medium",
          "cornerRadius": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "※学籍番号は、サービス運用上のメール送信にのみ使用します。その他目的に使用することはありません。",
              "margin": "lg",
              "wrap": true,
              "size": "sm"
            }
          ]
        }
      ],
      "paddingAll": "xl"
    }
  },

  auth_guide2:function(user_studentnumbre){
    const content = {
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
                "text": "認証メールを",
                "size": "xl",
                "align": "center",
                "color": "#ff3d3d",
                "weight": "bold",
                "wrap": true
              },
              {
                "type": "text",
                "text": `「${user_studentnumbre}@shinshu-u.ac.jp」`,
                "size": "xl",
                "align": "center",
                "color": "#ff3d3d",
                "weight": "bold",
                "wrap": true
              },
              {
                "type": "text",
                "text": "宛に送信しました",
                "size": "xl",
                "align": "center",
                "color": "#ff3d3d",
                "weight": "bold",
                "wrap": true
              },
              {
                "type": "text",
                "wrap": true,
                "margin": "md",
                "align": "center",
                "text": "メール記載の認証コードを入力し、"
              },
              {
                "type": "text",
                "text": "送信してください",
                "align": "center"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "メール未受信・初めからやり直す場合は",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "こちら",
                    "size": "sm",
                    "color": "#1a0dab",
                    "decoration": "underline",
                    "flex": 0,
                    "action": {
                      "type": "message",
                      "text": "メールの再送をする"
                    }
                  }
                ],
                "justifyContent": "center",
                "margin": "md"
              }
            ],
            "paddingAll": "lg",
            "borderColor": "#1b5aad",
            "borderWidth": "medium",
            "cornerRadius": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "※学籍番号は、サービス運用上のメール送信にのみ使用します。その他目的に使用することはありません。",
                "margin": "lg",
                "wrap": true,
                "size": "sm"
              }
            ]
          }
        ],
        "paddingAll": "xl"
      }
    }
    return content;
  },

  user_policy:function(token){
    const content = {
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
                "text": "「課題自動取得」利用上の注意",
                "size": "xl",
                "align": "center",
                "color": "#ff3d3d",
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "① このサービスで取得できない課題の種類がありますのでご注意ください。",
                "wrap": true,
                "margin": "md",
                "weight": "bold"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "取得できない課題例：",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "・eAlps上で提出期限が設定されていないもの",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm",
                    "color": "#ff3d3d",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": "・eAlps以外（Google Classroom, Google Form等）で提出するもの",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm",
                    "weight": "bold",
                    "color": "#ff3d3d"
                  },
                  {
                    "type": "text",
                    "text": "・その他、独自の提出方法を採用しているもの",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm"
                  }
                ],
                "borderWidth": "normal",
                "borderColor": "#666666",
                "cornerRadius": "md",
                "paddingAll": "xs",
                "paddingStart": "lg",
                "margin": "sm"
              },
              {
                "type": "text",
                "text": "② このサービス上に、すべての課題が表示されていることは保証できません。",
                "wrap": true,
                "margin": "md",
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "必ずeAlpsを確認し、上記「取得できない課題例」に含まれる課題が出ていないか確認してください。",
                "wrap": true,
                "margin": "sm",
                "size": "sm",
                "align": "center"
              },
              {
                "type": "text",
                "text": "③ 本サービスは、課題提出の遅延・未提出などに対して、一切の責任を負いません。",
                "wrap": true,
                "margin": "md",
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "あくまで補助的なサービスとしてお使いください。",
                "wrap": true,
                "margin": "sm",
                "size": "sm",
                "align": "center"
              },
              {
                "type": "text",
                "text": "④ 本サービスを利用する上で、以下の情報がサーバーに保存されます。",
                "wrap": true,
                "margin": "md",
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "これらの情報は、サービス運用の目的のみで使用し、他の目的では使用しません。",
                "wrap": true,
                "margin": "sm",
                "size": "sm",
                "weight": "bold",
                "color": "#ff3d3d",
                "offsetStart": "md"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "・取得可能な課題の詳細情報",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "・通知送信先のメールアドレス",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "・課題取得先のURL",
                    "wrap": true,
                    "margin": "sm",
                    "size": "sm"
                  }
                ],
                "borderWidth": "normal",
                "borderColor": "#666666",
                "cornerRadius": "md",
                "paddingAll": "xs",
                "paddingStart": "lg",
                "margin": "sm"
              }
            ],
            "paddingAll": "lg",
            "borderColor": "#1b5aad",
            "borderWidth": "medium",
            "cornerRadius": "md"
          }
        ],
        "paddingAll": "xl",
        "paddingBottom": "none"
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "上記内容をよく読み、",
            "wrap": true,
            "size": "xs",
            "align": "center",
            "margin": "md"
          },
          {
            "type": "text",
            "text": "下のボタンから初期設定に進んでください。",
            "wrap": true,
            "size": "xs",
            "align": "center"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "①～③に同意し、初期設定を開始する",
                "color": "#FFFFFF",
                "align": "center"
              }
            ],
            "backgroundColor": "#1b5aad",
            "paddingAll": "xl",
            "cornerRadius": "xs",
            "action": {
              "type": "message",
              "text": `${token}@初期設定を開始する`
            },
            "margin": "sm"
          }
        ],
        "paddingTop": "none"
      }
    };
    return content;
  },

  link_guide:function(year, user_department){
    const content = {
      "type": "carousel",
      "contents": [
        {
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
                    "text": "初期設定のやり方",
                    "size": "xl",
                    "align": "center",
                    "color": "#ff3d3d",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": "① スライド最終ページにあるボタン「設定A」から、ACSUにログインします。",
                    "wrap": true,
                    "margin": "md",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": "※リンク先はACSU公式のページです。",
                    "size": "sm",
                    "wrap": true,
                    "margin": "sm"
                  },
                  {
                    "type": "text",
                    "text": "② 写真のように、ボタンを選択してください。",
                    "wrap": true,
                    "margin": "md",
                    "weight": "bold"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "image",
                        "url": "https://user-images.githubusercontent.com/106244679/231330975-e1334e9b-4e7b-44ea-b0c0-7aa2ba3389a6.jpg",
                        "size": "full"
                      }
                    ],
                    "margin": "md"
                  }
                ],
                "paddingAll": "lg",
                "borderColor": "#1b5aad",
                "borderWidth": "medium",
                "cornerRadius": "md"
              }
            ],
            "paddingAll": "xl",
            "paddingBottom": "none"
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "左へスライドして次へ",
                "size": "md",
                "align": "center",
                "color": "#838383"
              }
            ],
            "paddingAll": "lg"
          }
        },
        {
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
                    "text": "③ 「カレンダーURL」を取得して、全てコピーしてください。",
                    "wrap": true,
                    "margin": "md",
                    "weight": "bold"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "image",
                        "url": "https://user-images.githubusercontent.com/106244679/231331004-f448c4eb-2808-4307-a49e-6498aa095ba2.jpg",
                        "size": "full"
                      }
                    ],
                    "margin": "md"
                  },
                  {
                    "type": "text",
                    "text": "④ 「カレンダーURL」を、このアカウントにメッセージとして送信してください。",
                    "wrap": true,
                    "margin": "md",
                    "weight": "bold"
                  },
                  {
                    "type": "text",
                    "text": "⑤ 同じ手順を、「設定B」でも行ってください。",
                    "wrap": true,
                    "margin": "md",
                    "weight": "bold"
                  }
                ],
                "paddingAll": "lg",
                "borderColor": "#1b5aad",
                "borderWidth": "medium",
                "cornerRadius": "md"
              }
            ],
            "paddingAll": "xl",
            "paddingBottom": "none"
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "左へスライドして次へ",
                "size": "md",
                "align": "center",
                "color": "#838383"
              }
            ],
            "paddingAll": "lg"
          }
        },
        {
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
                    "text": "手順①～⑤をよく読んで、以下のボタンから設定を行ってください。",
                    "size": "lg",
                    "align": "center",
                    "wrap": true
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "設定A",
                        "align": "center",
                        "color": "#FFFFFF",
                        "size": "lg"
                      }
                    ],
                    "margin": "lg",
                    "backgroundColor": "#1b5aad",
                    "cornerRadius": "md",
                    "paddingAll": "lg",
                    "action": {
                      "type": "uri",
                      "uri": `https://lms.ealps.shinshu-u.ac.jp/${year}/g/calendar/export.php?openExternalBrowser=1`
                    }
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "設定B",
                        "align": "center",
                        "color": "#FFFFFF",
                        "size": "lg"
                      }
                    ],
                    "margin": "lg",
                    "backgroundColor": "#1b5aad",
                    "cornerRadius": "md",
                    "paddingAll": "lg",
                    "action": {
                      "type": "uri",
                      "uri": `https://lms.ealps.shinshu-u.ac.jp/${year}/${user_department}/calendar/export.php?openExternalBrowser=1`
                    }
                  },
                  {
                    "type": "text",
                    "margin": "sm",
                    "text": "※手順①～④を、設定Bでも行ってください。",
                    "wrap": true,
                    "size": "sm"
                  }
                ],
                "paddingAll": "lg",
                "borderColor": "#1b5aad",
                "borderWidth": "medium",
                "cornerRadius": "md"
              }
            ],
            "paddingAll": "xl",
            "paddingBottom": "none"
          }
        }
      ]
    };
    return content;
  },

  task_list: function(task_data_json){
    const content = {
      "type": "bubble",
      "size": "giga",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": task_data_json
      },
      "styles": {
        "footer": {
          "separator": true
        }
      }
    }
    return content;
  },

  content_box_noact: function(layout, margin, contents){
    const content = {
      "type": "box",
      "layout": layout,
      "margin": margin,
      "contents": contents
    };
    return content;
  },

  content_box_doact: function(layout, margin, contents, action_text){
    const content = {
      "type": "box",
      "layout": layout,
      "margin": margin,
      "contents": contents,
      "action": {
        "type": "message",
        "label": "action",
        "text": action_text
        }
    };
    return content;
  },

  content_box_postback: function(layout, margin, contents, post_data){
    const content = {
      "type": "box",
      "layout": layout,
      "margin": margin,
      "contents": contents,
      "action": {
        "type": "postback",
        "data": post_data
      }
    };
    return content;
  },

  content_text: function(text, size, weight, color, flex, margin){
    const content = {
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
  },

  content_separator: function(margin){
    var content = {
      "type": "separator",
      "margin": margin
    };
    return content;
  }

  // 追加はこの階層に
}
