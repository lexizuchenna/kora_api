const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendMail = async (from, subject, to, html) => {
  await transporter.sendMail({
    from: `"${from}"<${process.env.USER}>`,
    subject,
    to,
    html,
  });
};

module.exports = sendMail;