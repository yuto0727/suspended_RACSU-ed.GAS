function fix_ics_task_data(db_ctrl, user_ics){
  const ics_index_list = Parser.data(user_ics).from('SUMMARY:').to("DESCRIPTION:").iterate();
  const ics_date_list = Parser.data(user_ics).from('DTEND:').to('\r\n').iterate();
  const ics_code_list = Parser.data(user_ics).from('CATEGORIES:').to('\r\n').iterate();
  let task_data = [];

  for(var i = 0, len = ics_index_list.length; i < len; ++i){

    if(fix_time_code(ics_date_list[i]) == null){
      continue;
    }

    if (ics_index_list[i].indexOf("の提出期限が近づいています") !== -1){
      const task_name = ics_index_list[i].split("」の提出期限が近づいています")[0].replace("「", "");
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("の提出期限") !== -1){
      const task_name = ics_index_list[i].split("」の提出期限")[0].replace("「", "");
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("の受験可能期間の終了") !== -1){
      const task_name = ics_index_list[i].split(" の受験可能期間の終了")[0];
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("」終了") !== -1){
      const task_name = ics_index_list[i].split("」終了")[0].replace("「", "");
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf(" 要完了") !== -1){
      const task_name = ics_index_list[i].split(" 要完了")[0];
      task_data.push([get_class_name_data(db_ctrl, ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);
    }
  }

  return task_data;
}

function fix_time_code(time_code){
  const today = new Date();
  const limit_year = Number(time_code.slice(0,4));
  const limit_month = Number(time_code.slice(4,6));
  const limit_day = Number(time_code.slice(6,8));
  const limit_time_h = Number(time_code.slice(9,11))+9;
  const limit_time_m = Number(time_code.slice(11,13));
  const limit = new Date(limit_year, limit_month-1, limit_day, limit_time_h, limit_time_m, 0);

  if (limit - today >= 0){
    return limit;
  }else{
    return null;
  }
}

function make_flex_task_data(task_data){
  const today = new Date();
  const tomorrow = new Date().setDate(today.getDate()+1);

  return;

//   // 完了フラグ取得
//   var flag_finish = read_excel_value_all_rownum(username+"_課題表", 9);

//   // 未完了課題格納リスト
//   var task_unfinished = [];

//   for(var i = 1, len = flag_finish.length; i < len; ++i){
//     if (flag_finish[i] == ""){
//       // 完了報告がされていない課題に適用
//       task_unfinished.push(read_excel_value_all_linenum(username+"_課題表", i+1));
//     };
//   };

//   // 課題リストの読み込みインデックス番号
//   var list_index = 0;

//   // インデックス番号の最大値
//   var list_index_max = task_unfinished.length-1;

//   // 課題が未登録の場合
//   if (list_index_max == -1){
//     return _text("課題が未登録です。");
//   }

//   // 送信コンテンツリスト作成
//   var contents_sendable = [];

//   // 表題追加
//   contents_sendable.push(makeBox("horizontal", "none", [makeText(`${today_month}/${today_day}現在 登録課題一覧`, "sm", "bold", "#1DB446", 0, "none")]));

//   // セパレーター追加
//   contents_sendable.push(makeSeparetor("md"));

//   // 当日提出の表題追加
//   contents_sendable.push(makeBox("vertical", "md", [makeBox("horizontal", "none", [makeText("今日中に提出", "lg", "bold", "#ffa500", 0, "none")])]));

//   while (true){
//     // 提出日が当日の場合のみ追加
//     if (task_unfinished[list_index][4] == today_month && task_unfinished[list_index][5] == today_day){
//       // 追加用一時リスト定義
//       var contents_oneTask = [];

//       // 提出時間追加
//       contents_oneTask.push(makeText(task_unfinished[list_index][6].replace("-", ":"), "md", "regular", "#ff4500", 0, "none"));

//       // 講義名追加
//       contents_oneTask.push(makeText(task_unfinished[list_index][2].substr(0, 5)+"…", "lg", "regular", "#555555", 1, "md"));

//       // 課題形式追加
//       contents_oneTask.push(makeText(task_unfinished[list_index][3].substr(0, 6)+"…", "sm", "regular", "#555555", 0, "none"));

//       // Boxに変換して追加
//       contents_sendable.push(makeBox_DoAction("horizontal", "md", contents_oneTask, `登録ID「${task_unfinished[list_index][0]}」の課題完了`));

//       // 読み込みインデックス +1
//       list_index += 1;
//     }else{
//       var todays_task_num = list_index;
//       break;
//     };
//   };

//   // セパレーター追加
//   contents_sendable.push(makeSeparetor("lg"));

//   // 今後提出の表題追加
//   contents_sendable.push(makeBox("horizontal", "xxl", [makeText("今後の提出予定", "lg", "bold", "#1e90ff", 0, "none")]));

// var tomorrow_task_num = 0;

// while (true){
//   var day_adding = task_unfinished[list_index][4]+task_unfinished[list_index][5];
//   var contents_oneDay = [];
//   while (true){
//     // 以下、提出日が同日の間ループ

//     // 追加用一時リスト定義
//     var contents_oneTask = [];

//     if (task_unfinished[list_index][4] == tomorrow_month && task_unfinished[list_index][5] == tomorrow_day){
//       // 提出日が翌日の場合に、提出時間を赤字に変更
//       var text_color = "#fa8072"
//     }else{
//       var text_color = "#555555"
//     }

//     // 翌日以降の課題数
//     tomorrow_task_num += 1;

//     // 提出時間追加
//     contents_oneTask.push(makeText(task_unfinished[list_index][6].replace("-", ":"), "md", "regular", text_color, 0, "md"));

//     // 講義名追加
//     contents_oneTask.push(makeText(task_unfinished[list_index][2].substr(0, 5), "md", "regular", "#555555", 1, "md"));

//     // 課題形式追加
//     contents_oneTask.push(makeText(task_unfinished[list_index][3].substr(0, 6), "sm", "regular", "#555555", 0, "none"));

//     // Boxに変換して追加
//     contents_oneDay.push(makeBox_DoAction("horizontal", "none", contents_oneTask, `登録ID「${task_unfinished[list_index][0]}」の課題完了`));

//     // 読み込みインデックス +1
//     list_index += 1;

//     // 最後まで読み込んだ場合break
//     if (list_index == list_index_max+1){
//       break;
//     };

//     // 次の課題が別日の場合break
//     if (task_unfinished[list_index][4]+task_unfinished[list_index][5] !== day_adding){
//       break;
//     };
//   }

//   // 以下、同日課題のまとめ処理完了後に実
//   // 上記部で作成したリストを用いて、共通の日付を付与してボックス生成
//   var contents_oneDay_all = [];

//   // 提出日付追加
//   contents_oneDay_all.push(makeText(`${task_unfinished[list_index-1][4]}/${task_unfinished[list_index-1][5]}`, "sm", "regular", text_color, 0, "none"));

//   // 課題内容追加
//   contents_oneDay_all.push(makeBox("vertical", "none", contents_oneDay));

//   // Boxを作って追加
//   contents_sendable.push(makeBox("horizontal", "md", contents_oneDay_all));

//   // セパレーター追加
//   contents_sendable.push(makeSeparetor("lg"));

//   // 最後まで読み込んだ場合break
//   if (list_index == list_index_max+1){
//     break;
//   };
// };


// // フッター追加
// contents_sendable.push(makeBox("horizontal", "md", [makeText("該当講義名をタップで完了登録ができます。", "xs", "regular", "#aaaaaa", 0, "none")]));

// // 全体データ作成
// var data = {
//     "type": "flex",
//     "altText": `${today_month}/${today_day} 本日提出：${todays_task_num}件 明日以降提出：${tomorrow_task_num}件`,
//     "contents": {
//       "type": "bubble",
//       "body": {
//         "type": "box",
//         "layout": "vertical",
//         "contents": contents_sendable
//       },
//       "styles": {
//         "footer": {
//           "separator": true
//         }
//       }
//     }
// };

// return data;
// }
}