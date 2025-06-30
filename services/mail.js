const nodemailer = require("nodemailer");

// nodeMailer

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "harshparmar87990@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

// mail endpoint

exports.sendMail = async function ({ to, subject, text, html }) {
  let info = await transporter.sendMail({
    from: '"SUPER SYN TEAM" <harshparmar87990@gmail.com>',
    to,
    subject,
    text,
    html
  });
  return info;
};
