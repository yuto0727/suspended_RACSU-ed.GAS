const db_id = {
  ctrl:"18_GR4t0Yt4LpgmS1L5ah8LJyH3FVd9Bx4PmoSoQ4WNM",
  task:"1RvkWQVK24eRs96lSYzn-6Iv4xOpD8pWreAssLh21RXQ"
}

const admin_id = {
  main:"U991c6ebc40028a4c00636723d2ed1f70",
  contact: "U991c6ebc40028a4c00636723d2ed1f70"
}

const acc_token = {
  main:'XvxePA0I10kkGP64M3A50vAE/R855UXINA7gYpXbVv02a07AV+61bReZnoRgTtSM0hL1AwL+uFo5kETdTsSKs1qNloF2wz3Guzc6Jf3cznsO3CoduXefrxx9RrxAHzUnla+mkyTmVRGebYebK+9coQdB04t89/1O/w1cDnyilFU=',
  contact:'1MqtcfE6SEUpkz9Xg0FEZGHe/AlMMNwpAwua8LkomjTXZ4yrOzBG4Jf19QvsDawyq6EcXXD7kSqU0pPxiVPyxeBZWe/aoKrbOvKgOH+Y/uSmqJQLjBdekVVEla0O/6H4pkyBqZf6MA2dt8aSzrGXEQdB04t89/1O/w1cDnyilFU='
}

const env_data = {
  fiscal_year: function(){
    const today_data = new Date();
    let this_month = Number(today_data.getMonth()) + 1;
    let this_year = Number(today_data.getFullYear());

    if (this_month <= 3){
      return this_year - 1;
    }else{
      return this_year;
    }
  },
  youbi: ["日", "月", "火", "水", "木", "金", "土"],
  domain: "https://lms.ealps.shinshu-u.ac.jp/"
}