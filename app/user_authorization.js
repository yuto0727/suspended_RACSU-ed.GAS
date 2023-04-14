function make_token(digits) {
  let token = "a";
  for (let i=0; i<digits; i++){
    token += Math.floor(Math.random()*10).toString();
  }
  return token;
}