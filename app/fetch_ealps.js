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