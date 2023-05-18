const db_id = {
  ctrl: PropertiesService.getScriptProperties().getProperty("DATABASEID_CTRL"),
  task: PropertiesService.getScriptProperties().getProperty("DATABASEID_TASK")
}

const admin_id = {
  main:PropertiesService.getScriptProperties().getProperty("LINEID_ADMIN"),
  status: PropertiesService.getScriptProperties().getProperty("LINEID_ADMIN")
}

const acc_token = {
  main: PropertiesService.getScriptProperties().getProperty("LINETOKEN_MAIN"),
  status: PropertiesService.getScriptProperties().getProperty("LINETOKEN_STATUS")
}

const env_data = {
  fiscal_year: function(){
    const today_data = new Date();
    let this_month = Number(today_data.getMonth()) + 1;
    let this_year = Number(today_data.getFullYear());

    if (this_month <= 3){
      return this_year - 1;
    }else{
      return this_year;
    }
  },
  youbi: ["日", "月", "火", "水", "木", "金", "土"],
  domain: "https://lms.ealps.shinshu-u.ac.jp/"
}