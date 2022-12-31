function test() {
  const db_user = SSheetDB.open(db_id.user);
  const db_log = SSheetDB.open(db_id.log);
  const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
  const lc_admin = new LineBotSDK.Client({channelAccessToken:acc_token.admin});

  // const user_message = "21t2168t"
  // let t = user_message.match(/[LEJSMTAF]/i);

  // const user_message = "https://developers.line.biz/flex-simulator/?status=success";
  const user_message = "https://lms.ealps.shinshu-u.ac.jp/2022/t/calendar/export_execute.php?userid=7&authtoken=6887fdb79ef84ed7c74f076bd0168f89dfaeccb0&preset_what=all&preset_time=recentupcoming"


  try{
    const url_param = user_message.split(/[/=&?]/);
    if (user_message.indexOf(env_data.domain) == -1 || url_param[6] !== "export_execute.php"){
      // URLエクスポート先のスクリプトが含まれるか
      throw new Error("URLの形式が不正です。正しいURLを送信してください。");

    } else if (url_param.length !== 15){
      // URLパラメータ数が正規数含まれるか
      throw new Error("URLが最後までコピーされていない可能性があります。最後まですべてコピーして送信してください。");

    } else {
      const url_param_department = url_param[url_param.indexOf(env_data.fiscal_year().toString())+1];
      const url_param_userid = url_param[url_param.indexOf("userid")+1];
      const url_param_authtoken = url_param[url_param.indexOf("authtoken")+1];

      if (!is_correct_ealps_id(url_param_department, url_param_userid, url_param_authtoken)){
        // 実際にFitchしてみて正しいデータが取れるか
        throw new Error("URLの有効性を確認できませんでした。正しいURLを送信してください。");
        
      } else {
        console.log(url_param_authtoken)
      }
    }
    
  } catch(error) {
    const error_message = error.toString().split("Error: ")[1];
    console.log(error_message);
  }

  const id_b = get_user_data(db_user, admin_id.admin, "専門ID");
  console.log(id_b)

  console.log(is_maintenance(db_user))
  

  

  // const t = is_unregistered_user(db_user, "a")
  

  // add_ctrl_log(db_log, "エラー追加てすと")

  // const user_id = admin_id.admin;

  // lc_main.pushMessage(admin_id.admin, [{
  //   "type": "flex", 
  //   "altText": "友達登録ありがとうございます！",
  //   "contents": flex.link_guide("2022", "t")
  // }]);
  // add_user(db_user, user_id, "べち");

  // set_user_data(db_user, admin_id.admin, "キャッシュデータ", "N/A")


  // const user_studentnumbre = user_message.match(/\d\d[LEJSMTAF]\d\d\d\d./i);
}
