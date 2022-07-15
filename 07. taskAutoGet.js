function getTask(username, userid, authtoken, category){
  var url = `https://lms.ealps.shinshu-u.ac.jp/${this_year().toString()}/${category}/calendar/export_execute.php?userid=${userid}&authtoken=${authtoken}&preset_what=all&preset_time=recentupcoming`

  console.log(url);

  var ics = UrlFetchApp.fetch(url).getContentText("UTF-8");

  console.log(ics);
  console.log("get OK");

  var ics_index_list = Parser.data(ics)
  .from('SUMMARY:')
  .to("\r\n")
  .iterate();

  console.log("pars1 ok")

  var ics_date_list = Parser.data(ics)
  .from('DTEND:')
  .to('\r\n')
  .iterate();

  console.log("pars2 ok")

  var ics_code_list = Parser.data(ics)
  .from('CATEGORIES:')
  .to('\r\n')
  .iterate();

  console.log("pars3 ok")

  var task_list = [];

  for(var i = 0, len = ics_index_list.length; i < len; ++i){
    console.log(i, ics_index_list[i], ics_date_list[i], ics_code_list[i])
    if (ics_index_list[i].indexOf("の提出期限が近づいています") !== -1 && fixTimeCode(ics_date_list[i]) !== null){
      console.log("a")
      var task_index = ics_index_list[i].slice(1, -14);
      task_list.push([getClassName(ics_code_list[i]), task_index, fixTimeCode(ics_date_list[i])]);
    }else if (ics_index_list[i].indexOf("の受験可能期間の終了") !== -1 && fixTimeCode(ics_date_list[i]) !== null){
      console.log("b")
      var task_index = ics_index_list[i].split(" の受験可能期間の終了")[0];
      task_list.push([getClassName(ics_code_list[i]), task_index, fixTimeCode(ics_date_list[i])]);
    }else if (ics_index_list[i].indexOf("」終了") !== -1 && fixTimeCode(ics_date_list[i]) !== null){
      console.log("c")
      var task_index = ics_index_list[i].split("」終了")[0].replace("「", "");
      task_list.push([getClassName(ics_code_list[i]), task_index, fixTimeCode(ics_date_list[i])]);
    }else{
      console.log("pass")
    };
  };

  console.log(task_list);
  if (task_list.length !== 0){
    saveTask(username, task_list);
  }
}

function fetchSyllabus(code){
  code = code.slice(0, 8);
  if (code.slice(0,1) == "Q"){ // 教職課程
    var bukyoku = "G"
  }else{
    var bukyoku = code.slice(0,1)
  }
  var url = `https://campus-3.shinshu-u.ac.jp/syllabusj/Display?NENDO=${this_year().toString()}&BUKYOKU=${bukyoku}&CODE=${code}`;
  var html = UrlFetchApp.fetch(url).getContentText("UTF-8");

  var classname_A = Parser.data(html)
  .from('授業名')
  .to('</td>')
  .iterate()[0];

  var classname_B = Parser.data(html)
  .from('科目名')
  .to('</td>')
  .iterate()[0];

  console.log(classname_A, classname_B)

  if (classname_A == "<!" && classname_B == "<!"){
    sendMessage([_text(`該当講義がない授業コードが検出されました。\n\nコード：${code}`)], [userID_admin], method="multicast", account="admin");
    var classname = "該当授業なし";
  }else if (classname_A.indexOf("DOCTYPE") == -1){
    var classname = classname_A.split('">')[1];
  }else if (classname_B.indexOf("DOCTYPE") == -1){
    var classname = classname_B.split('">')[1];
  }
  
  return classname;
}

function getClassName(code){
  dic_raw = read_excel_value_all_rownum("class_table", 1);
  var dic = [];
  for(var i = 0, len = dic_raw.length; i < len; ++i){
    dic.push(dic_raw[i][0]);
  }

  console.log(dic);

  if (dic.indexOf(code) !== -1){
    console.log("exist");
    var name = read_excel_value_all_rownum("class_table", 2)[dic.indexOf(code)][0];
  }else{
    console.log("none");
    var name = fetchSyllabus(code);
    write_excel_value_append("class_table", [code, name]);
  }

  console.log(name);
  return name;
}

function fixTimeCode(code){
    var today_data = new Date();

    var limit_year = Number(code.slice(0,4));
    var limit_month = Number(code.slice(4,6));
    var limit_day = Number(code.slice(6,8));
    var limit_time_h = Number(code.slice(9,11))+9;
    var limit_time_m = Number(code.slice(11,13));

    var limit = new Date(limit_year, limit_month-1, limit_day, limit_time_h, limit_time_m, 0);

    console.log(today_data, limit, limit - today_data)

    if (limit - today_data >= 0){
      return [limit_month, limit_day, `${limit_time_h}-${(limit_time_m.toString()+"0").slice(0,2)}`];
    }else{
      return null;
    }

}

function saveTask(username, datalist){
  var taskId_b_saved = read_excel_value_all_rownum(username+"_課題表", 2).flat();
  var taskId_a = read_excel_value_all_rownum(username+"_課題表", 1).length + 100001;

  for(var i = 0, len = datalist.length; i < len; ++i){
    // ID-B生成 講義名、課題名の冒頭3文字 + 期限の結合文字列 
    var taskId_b = datalist[i][0].slice(0,3) + datalist[i][1].slice(-10) + datalist[i][2].join("");

    if (taskId_b_saved.includes(taskId_b) == false){
      // 未登録の課題の場合のみ追加
      
      var savedata = [taskId_a, taskId_b, datalist[i][0], datalist[i][1], datalist[i][2][0], datalist[i][2][1], datalist[i][2][2], Number(datalist[i][2][0]+("0"+datalist[i][2][1].toString()).slice(-2)+("0"+datalist[i][2][2].split("-")[0]).slice(-2)+datalist[i][2][2].split("-")[1])];

      write_excel_value_append(username+"_課題表", savedata);
      taskId_a += 1;
    }else{
      console.log("登録済みの課題です")
    };
  };

  // 提出日順にソート
  sortSpreadsheet(username+"_課題表");

  // 書式なしに設定
  set_excel_style_all_rownum(username+"_課題表", 7);
}

function testID(category, userid, authtoken){
  var url = `https://lms.ealps.shinshu-u.ac.jp/${this_year()}/${category}/calendar/export_execute.php?userid=${userid}&authtoken=${authtoken}&preset_what=all&preset_time=recentupcoming`

  var data = UrlFetchApp.fetch(url).getContentText("UTF-8");
  if (data.indexOf("METHOD:PUBLISH") !== -1){
    return "OK";
  }else{
    return "error";
  };
}