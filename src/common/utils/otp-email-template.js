
const emailTemplate = async({
  appName = "Sarahah app",
  userName = "user",
  otp,
  expiryMinutes = 5,
} = {})=>{
  
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


  const name = escapeHtml(userName);
  const app = escapeHtml(appName);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Your verification code</title>
</head>
<body style="margin:0;padding:0;background:#f1f3f4;font-family:'Google Sans',Roboto,Arial,Helvetica,sans-serif;color:#202124;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
  Your verification code is ${otp}. It expires in ${expiryMinutes} minutes.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f3f4;padding:32px 12px;">
  <tr>
    <td align="center">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border:1px solid #dadce0;border-radius:8px;">

        <tr>
          <td align="center" style="padding:36px 40px 8px;">
            <div style="font-size:22px;font-weight:500;color:#1a73e8;letter-spacing:.2px;">${app}</div>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:16px 40px 0;">
            <h1 style="margin:0;font-size:24px;font-weight:400;line-height:32px;color:#202124;">Verify your email address</h1>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:16px 40px 0;font-size:14px;line-height:22px;color:#5f6368;">
            Hi ${name}, use this code to finish signing in. Don’t share it with anyone.
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:28px 40px;">
            <div style="background:#e8f0fe;border-radius:8px;padding:18px 12px;">
              <span style="font-family:'Courier New',Courier,monospace;font-size:36px;font-weight:700;letter-spacing:12px;color:#1a73e8;padding-left:12px;">${otp}</span>
            </div>
            <div style="margin-top:12px;font-size:13px;color:#5f6368;">
              This code expires in <strong>${expiryMinutes} minutes</strong>.
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:0 40px;"><div style="border-top:1px solid #e8eaed;"></div></td>
        </tr>

        <tr>
          <td style="padding:20px 40px 32px;font-size:13px;line-height:20px;color:#5f6368;">
            If you didn’t request this code, you can safely ignore this email. Someone may have typed your address by mistake.
          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
        <tr>
          <td align="center" style="padding:20px 20px 0;font-size:12px;line-height:18px;color:#80868b;">
            This is an automated message, please don’t reply.<br>
            © ${year} ${app}. All rights reserved.
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}

// توليد كود من 6 أرقام



export default emailTemplate