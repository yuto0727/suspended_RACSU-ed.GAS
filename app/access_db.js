function get_user_status(db_user, user_id){
  const user_status = db_user.table("ユーザーデータ")
  .select([
    "LINE ID",
    "会員ステータス",
    "処理ステータス",
    "認証ステータス"
  ])
  .where({
    "LINE ID" : ["==", user_id]
  })
  .result()[0];
  return user_status;
}

function add_user(db_user, user_id, user_name){
  db_user.table("ユーザーデータ").insert([{
    "LINE ID": user_id, 
    "ユーザーネーム": user_name, 
    "入学年度": "", 
    "学部": "",
    "共通ID": "",
    "共通Token": "",
    "専門ID": "",
    "専門Token": "",
    "登録日時": "",
    "会員ステータス": "無料", 
    "認証ステータス": "未認証",
    "処理ステータス": "学籍番号送信待ち",
    "キャッシュデータ": ""
  }]);
}
