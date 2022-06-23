function read_excel_value(sheetName, cellNum){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var value = sheet.getRange(cellNum).getValue();
  return value;
}

function read_excel_value_all(sheetName){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var list = sheet.getDataRange().getValues();
  return list;
}

function read_excel_value_all_row(sheetName) {
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var list = sheet.getRange(1, 1, sheet.getLastRow()).getValues();
  return list;
}

function read_excel_value_all_rownum(sheetName, rawNum) {
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var list = sheet.getRange(1, rawNum, sheet.getLastRow()).getValues();
  return list;
}

function read_excel_value_all_linenum(sheetName, lineNum) {
  var list = read_excel_value_all(sheetName);
  return list[lineNum-1];
}

function write_excel_value(sheetName, cellNum, data){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.getRange(cellNum).setValue(data);
}

function write_excel_value_append(sheetName, data){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.appendRow(data)
}

function make_sheet(sheetName){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  spreadsheet.insertSheet().setName(sheetName);
}

function delete_sheet(sheetName){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  spreadsheet.deleteSheet(sheet);
}

function delete_index(sheetName, indexName){
  var data = read_excel_value_all_row(sheetName);
  var list = [];
  for(var i=0;i<data.length;i++){
      list.push(data[i][0]);
  }
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.deleteRow(list.indexOf(indexName) + 1)
}

function get_excel_lastRawNum(sheetName){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  return sheet.getLastRow();
}

function get_excel_textRawNum(sheetName, raw, data){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();

  for(var i = 1; i <= lastRow; i++){
    if(sheet.getRange(i, raw).getValue() === data){   
          return i
    }
  }
}

function sortSpreadsheet(sheetName){
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);

  var lr = sheet.getLastRow();
  var lc = sheet.getLastColumn();

  let data = sheet.getRange(2, 1, lr-1, lc);

  //列Eを基準に降順でソートする
  data.sort({column: 8, ascending: true});
}

function set_excel_style_all_rownum(sheetName, rawNum) {
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  var sheet = spreadsheet.getSheetByName(sheetName);
  sheet.getRange(1, rawNum, sheet.getLastRow()).setNumberFormat('@');
}


