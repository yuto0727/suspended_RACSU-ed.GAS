function get_task_data(lc_main, db_ctrl, user_id, user_department, user_eapls_userid, user_eapls_authtoken){
  const ics = get_user_ics(user_department, user_eapls_userid, user_eapls_authtoken);
  const ics_index_list = Parser.data(ics).from('SUMMARY:').to("DESCRIPTION:").iterate();
  const ics_date_list = Parser.data(ics).from('DTEND:').to('\r\n').iterate();
  const ics_code_list = Parser.data(ics).from('CATEGORIES:').to('\r\n').iterate();
  let task_data = [];

  for(var i = 0, len = ics_index_list.length; i < len; ++i){
    // console.log(ics_index_list[i], ics_date_list[i], fix_time_code(ics_date_list[i]))

    if(fix_time_code(ics_date_list[i]) == null){
      // console.log("提出期限外");
      continue;
    }

    if (ics_index_list[i].indexOf("の提出期限が近づいています") !== -1){
      const task_name = ics_index_list[i].split("」の提出期限が近づいています")[0].replace("「", "");
      task_data.push([get_class_name_data(ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("の提出期限") !== -1){
      const task_name = ics_index_list[i].split("」の提出期限")[0].replace("「", "");
      task_data.push([get_class_name_data(ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("の受験可能期間の終了") !== -1){
      const task_name = ics_index_list[i].split(" の受験可能期間の終了")[0];
      task_data.push([get_class_name_data(ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf("」終了") !== -1){
      const task_name = ics_index_list[i].split("」終了")[0].replace("「", "");
      task_data.push([get_class_name_data(ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else if (ics_index_list[i].indexOf(" 要完了") !== -1){
      const task_name = ics_index_list[i].split(" 要完了")[0];
      task_data.push([get_class_name_data(ics_code_list[i]), task_name, fix_time_code(ics_date_list[i])]);

    }else{
      // console.log("対象外");
    }
  }

  console.log(task_data);
  if (task_data.length !== 0){
    // saveTask(username, task_data);
  }
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