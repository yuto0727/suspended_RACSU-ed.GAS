function make_task_sheet(db_task, user_id){
  db_task.createTable(user_id,{
    "SerialID": "@",
    "UniqueID": "@",
    "講義名": "@",
    "課題名": "@",
    "提出日": "yyyy/mm/dd"
  });
}

function save_task(db_task, user_id, task_data){
  task_data = ""


  db_task.table(user_id).insert([{
    "SerialID": "@",
    "UniqueID": "@",
    "講義名": "@",
    "課題名": "@",
    "提出日": "yyyy/mm/dd"
  }]);
}