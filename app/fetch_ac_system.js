function is_correct_ealps_id(user_department, user_eapls_userid, user_eapls_authtoken){
  const url = `https://lms.ealps.shinshu-u.ac.jp/${env_data.fiscal_year()}/${user_department}/calendar/export_execute.php?userid=${user_eapls_userid}&authtoken=${user_eapls_authtoken}&preset_what=all&preset_time=recentupcoming`
  const data = UrlFetchApp.fetch(url).getContentText("UTF-8");
  if (data.indexOf("METHOD:PUBLISH") !== -1){
    return true;
  }else{
    return false;
  };
}

function get_user_ics(user_department, user_eapls_userid, user_eapls_authtoken){
  const url = `https://lms.ealps.shinshu-u.ac.jp/${env_data.fiscal_year()}/${user_department}/calendar/export_execute.php?userid=${user_eapls_userid}&authtoken=${user_eapls_authtoken}&preset_what=all&preset_time=recentupcoming`
  const ics = UrlFetchApp.fetch(url).getContentText("UTF-8");
  return ics
}

function get_syllabus_class_name(class_code){
  class_code = class_code.slice(0, 8).replace("Q", "G");
  const department = class_code.slice(0,1)
  const url = `https://campus-3.shinshu-u.ac.jp/syllabusj/Display?NENDO=${env_data.fiscal_year()}&BUKYOKU=${department}&CODE=${class_code}`;

  const html = UrlFetchApp.fetch(url).getContentText("UTF-8");
  const class_name_A = Parser.data(html).from('授業名').to('</td>').iterate()[0];
  const class_name_B = Parser.data(html).from('科目名').to('</td>').iterate()[0];
  let class_name;

  if (class_name_A == "<!" && class_name_B == "<!"){
    class_name = class_code;
  }else if (class_name_A.indexOf("DOCTYPE") == -1){
    class_name = class_name_A.split('">')[1];
  }else if (class_name_B.indexOf("DOCTYPE") == -1){
    class_name = class_name_B.split('">')[1];
  }

  return class_name;
}