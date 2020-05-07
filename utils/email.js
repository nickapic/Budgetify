const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name.split(" ")[0];
    this.url = url;
    this.from = "Budgetify";
  }

  createTransport() {}

  send(template, subject) {
    //Send Actuall Email
    //1) Render the HTML for email
    //2)Define Email Option
    const mailOptions = {
        from = "Budgetify"
        
    }
  }

  sendWelcome() {
    this.send(
      "welcome",
      "Welcome to the Budegtify Application.If you have any issues with our product please feel free to message and email us about it"
    );
  }
};
const sendEmail = (options) => {
  //1)Create a transporter
  const transporter = nodemailer.createTransport({});
  //2) Define Email Options
  //3)Actually send the email
};
