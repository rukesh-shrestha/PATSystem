const createMailTrasporter = require("./createMailTransporter");

const sendVerificationEmail = (user) => {
  const transpoter = createMailTrasporter();
  const mailOptions = {
    from: '"Rukesh Shrestha" <rukeshportfolio@gmail.com>',
    to: user.email,
    subject: "Email Verification",
    html: `
    <p>Hello ${user.name}</p>,

    <div>
        In order to continue with the system. You can verify your account by clicking the button below. 
        <hr>

        <a href='${process.env.DOMAIN_NAME}/api/users/verify-email?emailToken=${user.emailToken}'>Verify Your Email</a>
    </div>
    `,
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log(error.errno);
    } else {
      console.log("Verification Email Send");
    }
  });
};

module.exports = sendVerificationEmail;
