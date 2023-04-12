// --------------------------------------------------------------------------------------------
// データ取得
// --------------------------------------------------------------------------------------------
function get_user_status(db_ctrl, user_id){
  const user_status = db_ctrl.table("ユーザーデータ")
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

function get_user_data(db_ctrl, user_id, index){
  const data = db_ctrl.table("ユーザーデータ")
  .select([
    "LINE ID",
    index
  ])
  .where({
    "LINE ID" : ["==", user_id]
  })
  .result()[0][index];
  return data;
}

function get_class_name_data(db_ctrl, class_code){
  let class_name;
  try{
    class_name = db_ctrl.table("授業コード")
    .select([
      "授業コード",
      "授業名"
    ])
    .where({
      "授業コード" : ["==", class_code]
    })
    .result()[0]["授業名"];
  }catch{
    class_name = get_syllabus_class_name(class_code);
    add_class_name_data(db_ctrl, class_code, class_name);
  }
  return class_name;
}
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// データ追加
// --------------------------------------------------------------------------------------------
function add_class_name_data(db_ctrl, class_code, class_name){
  db_ctrl.table("授業コード").insert([{
    "授業コード": class_code,
    "授業名": class_name
  }]);
}

function add_user(db_ctrl, user_id, user_name){
  const time = Utilities.formatDate( new Date(), 'Asia/Tokyo', 'yyyy/MM/dd H:mm:ss');
  db_ctrl.table("ユーザーデータ").insert([{
    "LINE ID": user_id,
    "ユーザーネーム": user_name,
    "学籍番号": "N/A",
    "共通ID": "N/A",
    "共通Token": "N/A",
    "専門ID": "N/A",
    "専門Token": "N/A",
    "登録日時": time,
    "残り日数": "N/A",
    "会員ステータス": "無料",
    "認証ステータス": "未認証",
    "処理ステータス": "学籍番号送信待ち",
    "キャッシュデータ": "N/A"
  }]);
}

function add_ctrl_log(db_ctrl, ctrl){
  const time = Utilities.formatDate( new Date(), 'Asia/Tokyo', 'yyyy/MM/dd H:mm:ss');
  db_ctrl.table("コントロールログ").insert([{
    "タイムスタンプ": time,
    "メッセージ": ctrl
  }]);
}

function add_error_log(db_ctrl, error){
  const time = Utilities.formatDate( new Date(), 'Asia/Tokyo', 'yyyy/MM/dd H:mm:ss');
  db_ctrl.table("エラーログ").insert([{
    "タイムスタンプ": time,
    "エラーメッセージ": error
  }]);
}
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// データ更新
// --------------------------------------------------------------------------------------------
function set_user_data(db_ctrl, user_id, index, value){
  const data = {};
  data[index] = value;
  db_ctrl.table("ユーザーデータ")
  .update(
    data,
  {
    "LINE ID" : ["==", user_id]
  });
}
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// データチェック
// --------------------------------------------------------------------------------------------
function is_unregistered_user(db_ctrl, user_id){
  const is_exist = db_ctrl.table("ユーザーデータ").updateCount({
    "LINE ID" : ["==", user_id]
  });
  if (is_exist == []){
    return false;
  }else{
    return true;
  }
}

function is_ealps_id_all_registered(db_ctrl, user_id){
  const id_a = get_user_data(db_ctrl, user_id, "共通ID");
  const id_b = get_user_data(db_ctrl, user_id, "専門ID");
  if (id_a !== "N/A" && id_b !== "N/A"){
    return true;
  } else {
    return false;
  }
}

function is_maintenance(db_ctrl){
  const data = db_ctrl.table("パラメータ")
  .select([
    "パラメータ名",
    "値1"
  ])
  .where({
    "パラメータ名" : ["==", "メンテナンス"]
  })
  .result()[0]["値1"];

  console.log(data)

  if (data == "true"){
    return true;
  }else{
    return false;
  }
}
// --------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------
// データ削除
// --------------------------------------------------------------------------------------------
function erasure_user(db_ctrl, user_id){
  db_ctrl.table("ユーザーデータ").deleteRow({
    "LINE ID" : ["==", user_id]
  });
}
// --------------------------------------------------------------------------------------------