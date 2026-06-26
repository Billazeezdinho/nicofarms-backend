const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message, text, html }) => {
  const mailUser = process.env.EMAIL_USER || process.env.user;
  const mailPass = process.env.EMAIL_PASS || process.env.pass;

  if (!mailUser || !mailPass) {
    throw new Error("Missing email credentials in environment variables");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  const mailOptions = {
    from: mailUser,
    to: email,
    subject,
    text: text || message,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
module.exports.sendEmail = sendEmail;
