"use strict";
const nodemailer = require("nodemailer");
const nodemailerCustom = {
  /**
   * @async function
   * twillo send message common function
   */

  sendMail: async (toEmail, subject, content) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "info.cyberadz@gmail.com", // generated ethereal user
        pass: "Q8infocyberadz" // generated ethereal password
      }
    });

    // send mail with defined transport object
    let gmailAcc = await transporter.sendMail({
      from: "'Classified Admin'<admin@classifiedapp.com>",
      to: toEmail, // list of receivers
      subject: subject, // Subject line
      html: content,
      attachments: []
    });
    return gmailAcc;
  },

  sendInviteMail: async (toEmail, subject, content) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "info.charmr@gmail.com", // generated ethereal user
        pass: "Megam@n1" // generated ethereal password
      }
    });

    // send mail with defined transport object
    let gmailAcc = await transporter.sendMail({
      from: "'Charmr Admin'<admin@charmrpetapp.com>",
      to: toEmail, // list of receivers
      subject: subject, // Subject line
      html: content,
      attachments: []
    });
    return gmailAcc;
  },

  sendMailTest: async otp => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "filomena.hane@ethereal.email",
        pass: "B91UC3gx7TRQxMrWrQ"
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smartdata" <developer.smartdata@example.com>', // sender address
      to: "filomena.hane@ethereal.email", // list of receivers
      subject: "OTP for registration", // Subject line
      //text: 'Hello world?', // plain text body
      html: "OTP for Registration is <b>" + otp + "</b>" // html body
    });
  }
};

module.exports = nodemailerCustom;
