const db_ctrl = SSheetDB.open(db_id.ctrl);
const db_task = SSheetDB.open(db_id.task);
const lc_main = new LineBotSDK.Client({channelAccessToken:acc_token.main});
const lc_admin = new LineBotSDK.Client({channelAccessToken:acc_token.admin});
const user_id = "U5a2991011c7a349ab5c5bebc4347cfb6";

function test() {
  lc_main.pushMessage(user_id, [{
    "type": "text",
    "text": "初期設定が完了しました。"
  },{
    "type": "text",
    "text": "課題の取得処理中です。\nしばらくお待ち下さい。"
  }]);
}

function test2(){
  var sheet_id = "171f0lsXDHK2wB_Ag6nKjpm_tOavW2fwZE0kYQbcUsJk"
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName("シート1");
  var list = sheet.getDataRange().getValues();
  
  const db_ctrl = SSheetDB.open(db_id.ctrl);

  for (let i=1; i<list.length; i++){
    db_ctrl.table("授業コード").insert([{
      "授業コード": list[i][0], 
      "授業名": list[i][1], 
    }]);
  }
}




