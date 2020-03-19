const nodemailer = require("nodemailer");

const sendEmail = async options => {
  //DONE 1) Create a transporter(Basically a service that will actually send the email)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    //For gmail in your email you have to activate "less secure app" option
  });
  //DONE 2) Define the email options
  const mailOptions = {
    from: "Aniket Chauhan <nickapicspam@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
    //html:
  };
  //DONE 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
