function send_auth_email(address, token){
  const title = "認証コードのお知らせ"
  const body = `\
ご利用いただきありがとうございます。
あなたの認証コードは「${token}」です。
上記の6桁の認証コードをコピーして、
LINEのメッセージとして送信してください。
この認証を依頼していない場合は、このメールを無視してください。

こちらのメールに返信しても対応できません。
ご連絡はこちら：
racsu.shinshu.univ+support@gmail.com

RACSU 運営`

  const options = {
    name: "RACSU 学生メール認証",
    from: 'racsu.shinshu.univ+auth@gmail.com',
    noReply: true
  };

  GmailApp.sendEmail(address, title, body, options);
}