const nodemailer = require('nodemailer');

//nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
   
    },
});

const sendEmail = async (to, subject, text, html = '') => {
    try {
      const info = await transporter.sendMail({
        from: `"Movie Notification Service" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      console.error(`Error sending email: ${error.message}`);
      throw new Error('Failed to send email');
    }
  };
  
  module.exports = { sendEmail };