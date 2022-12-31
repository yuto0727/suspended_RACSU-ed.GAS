const db_id = {
  ctrl:"18_GR4t0Yt4LpgmS1L5ah8LJyH3FVd9Bx4PmoSoQ4WNM",
  task:"1RvkWQVK24eRs96lSYzn-6Iv4xOpD8pWreAssLh21RXQ"
}

const admin_id = {
  admin:"U5a2991011c7a349ab5c5bebc4347cfb6"
}

const acc_token = {
  main:'CmG1Ift30vaMzIDvpwtKDRVk11bs3r2FLRcGa9EDyZ0ytjQICShYpE+P14HuEOw+10gXMf/DGxkTbZaCwy5PdvaEd1PneOdVUtTcBx1jMOY6mbvD+BmXhIdcw5AkL7+fbEKE7vsIv1ecB1TyACL2QwdB04t89/1O/w1cDnyilFU=',
  admin:'eRYKeSKd6A5T9pvXybJJeulaC7a7Z06X4IQ6xj2k/O3YNwhjrVw8tymNeUFnd9v0cG9Ho/0z/78LpUmcWvTIHI578NOCMZ25i/yIImduKPVgYHHqxASyH9F1iSzp21dXN4H633lgw5e/PoyWERyR0AdB04t89/1O/w1cDnyilFU='
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
  youbi: ["月", "火", "水", "木", "金"],
  domain: "https://lms.ealps.shinshu-u.ac.jp/"
}