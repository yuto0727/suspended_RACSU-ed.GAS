function maintenance_add_user(){
  const user_name = "";
  const user_id = "";

  const db_user = SSheetDB.open(db_id.user);
  add_user(db_user, user_id, user_name);
}

function maintenance_erasure_user(){
  const user_name = "さぶ"

  const db_user = SSheetDB.open(db_id.user);
  db_user.table("ユーザーデータ").deleteRow({
    "ユーザーネーム" : ["==", user_name]
  });
}