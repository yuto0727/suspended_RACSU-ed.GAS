function doGet(e) {
  var getMode = e.parameter.getMode;

  if(getMode == "sendData"){
    var res = ContentService.createTextOutput();
    res = res.setMimeType(ContentService.MimeType.JAVASCRIPT);
    res = res.setContent("sendOK");
    console.log(e.parameter);
    saveData(e.parameter);

  }else{
    var res = ContentService.createTextOutput();
    res = res.setMimeType(ContentService.MimeType.JAVASCRIPT);
    res = res.setContent("error");
  }

  return res
}