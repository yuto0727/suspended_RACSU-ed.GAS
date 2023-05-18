const task_add_form_ = {
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
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "講義名：",
                "flex": 0,
                "gravity": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "class_name",
                    "color": "#bbbbbb"
                  }
                ],
                "borderColor": "#bbbbbb",
                "borderWidth": "light",
                "paddingAll": "md"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "課題名：",
                "flex": 0,
                "gravity": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "task_name",
                    "color": "#bbbbbb"
                  }
                ],
                "borderColor": "#bbbbbb",
                "borderWidth": "light",
                "paddingAll": "md"
              }
            ],
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "提出日：",
                "flex": 0,
                "gravity": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "未入力",
                    "color": "#aaaaaa"
                  }
                ],
                "borderColor": "#bbbbbb",
                "borderWidth": "light",
                "paddingAll": "md"
              }
            ],
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "繰り返し記録：",
                "flex": 0,
                "gravity": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "一度のみ",
                    "gravity": "center",
                    "action": {
                      "type": "message",
                      "text": "課題追加@mode0"
                    }
                  },
                  {
                    "type": "text",
                    "text": "今期終了まで一週間おき",
                    "gravity": "center",
                    "margin": "sm",
                    "action": {
                      "type": "message",
                      "text": "課題追加@mode1"
                    }
                  },
                  {
                    "type": "text",
                    "text": "今期終了まで二週間おき",
                    "gravity": "center",
                    "margin": "sm",
                    "action": {
                      "type": "message",
                      "text": "課題追加@mode2"
                    }
                  }
                ],
                "margin": "md"
              }
            ],
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
            "text": "追加する課題",
            "align": "center",
            "size": "lg",
            "color": "#1DB446",
            "weight": "bold"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "この内容で記録する",
                "size": "lg",
                "align": "center",
                "gravity": "center",
                "color": "#ffffff"
              }
            ],
            "paddingAll": "lg",
            "margin": "md",
            "cornerRadius": "md",
            "backgroundColor": "#1DB446",
            "action": {
              "type": "message",
              "text": "課題追加@送信"
            }
          }
        ],
        "borderColor": "#1b5aad",
        "cornerRadius": "md",
        "borderWidth": "medium",
        "margin": "md",
        "paddingAll": "md"
      }
    ],
    "paddingAll": "xl"
  }
}