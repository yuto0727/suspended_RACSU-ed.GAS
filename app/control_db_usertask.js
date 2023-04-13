function make_task_sheet(db_task, user_id){
  db_task.createTable(user_id,{
    "SerialID": "@",
    "UniqueID": "@",
    "講義名": "@",
    "課題名": "@",
    "提出日": "yyyy/mm/dd H:mm:ss",
    "完了": "@"
  });
}

function get_task_count(db_task, user_id){
  const result = db_task.table(user_id)
  .select(["*"])
  .result();
  return result.length;
}

function get_all_task_unique_id(db_task, user_id){
  let result = [];
  const data = db_task.table(user_id)
  .select([
    "UniqueID"
  ])
  .result();
  for (let i=0; i<data.length; i++){
    result.push(data[i]["UniqueID"]);
  }
  return result
}

function save_task(db_task, user_id, task_data){
  let unique_id_exist = get_all_task_unique_id(db_task, user_id);
  for (let i=0; i<task_data.length; i++){
    const limit = Utilities.formatDate(task_data[i][2], 'Asia/Tokyo', 'yyyy/MM/dd H:mm:ss');
    const unique_id = task_data[i][0].slice(0,3) + task_data[i][1].slice(-10) + limit.replace(" ", "");
    const serial_id = get_task_count(db_task, user_id) + 10001;

    if (!unique_id_exist.includes(unique_id)){
      db_task.table(user_id).insert([{
        "SerialID": serial_id,
        "UniqueID": unique_id,
        "講義名": task_data[i][0],
        "課題名": task_data[i][1],
        "提出日": limit
      }]);
      unique_id_exist.push(unique_id);
    }
  }
}

function delete_task_sheet(user_id){
  const spreadsheet = SpreadsheetApp.openById(db_id.task);
  const sheet_A = spreadsheet.getSheetByName(user_id);
  const sheet_B = spreadsheet.getSheetByName("%INDEX%");
  const data = sheet_B.getRange(1, 1, sheet_B.getLastRow()).getValues().flat();

  spreadsheet.deleteSheet(sheet_A);
  spreadsheet.getSheetByName("%INDEX%").deleteRow(data.indexOf(user_id) + 1)

}