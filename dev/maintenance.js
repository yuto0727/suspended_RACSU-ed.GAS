function maintenance_enable(){
  const db_user = SSheetDB.open(db_id.ctrl);
  db_user.table("パラメータ")
  .update({
      "メンテナンス": "false"
  },{
    "メンテナンス" : ["==", "true"]
  });
}

function maintenance_disable(){
  const db_user = SSheetDB.open(db_id.ctrl);
  db_user.table("パラメータ")
  .update({
      "メンテナンス": "true"
  },{
    "メンテナンス" : ["==", "false"]
  });
}

function maintenance_add_user(){
  const user_name = "";
  const user_id = "";
  const db_user = SSheetDB.open(db_id.ctrl);
  add_user(db_user, user_id, user_name);
}

function maintenance_erasure_user(user_name = "べっち/渡邊友翔"){
  const db_user = SSheetDB.open(db_id.ctrl);
  db_user.table("ユーザーデータ").deleteRow({
    "ユーザーネーム" : ["==", user_name]
  });
}

function maintenance_make_database_sheet(){
  const db = SSheetDB.newDB("");
  db.createTable("コントロールログ",{
    "タイムスタンプ": "@", 
    "メッセージ": "@"
  });
}

function maintenance_insert_sheet(){
  const db = SSheetDB.open(db_id.ctrl);
  db.createTable("エラーログ",{
    "タイムスタンプ": "@", 
    "メッセージ": "@"
  });
}