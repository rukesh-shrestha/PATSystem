const createMailTrasporter = require("./createMailTransporter");

const sendVerificationEmail = (user) => {
  const transpoter = createMailTrasporter();
  const mailOptions = {
    from: '"Rukesh Shrestha" <rukeshportfolio@gmail.com>',
    to: user.email,
    subject: "Verify Your Account - Action Required",
    html: `
    <p>Hello ${user.firstName},</p>

    <div>
        Thank you for signing up with our platform! We're excited to have you on board. To ensure the security of your account and complete the registration process, we kindly ask you to verify your account by clicking the link below:        

        <br>
        <br>
        
        
        <a href='${process.env.DOMAIN_NAME}/api/users/verify-email?emailToken=${user.emailToken}' style="text-decoration:none">Verify Your Email</a>
        
        <br>
        <br>

        Once verified, you'll have full access to all the features and services we offer.If you did not sign up for an account on our platform, please disregard this email. Your account will not be activated until you verify it using the provided link.
        <br>    

        If you encounter any issues or have any questions, feel free to contact at rukesh.shrestha11@gmail.com or rukesh.shrestha@heraldcollege.edu.np. We're here to help!
        <br>
        <br>     

        Thank you for using the system.
        <br>
        <br>      

        
        Best Regards,<br>
        Rukesh Shrestha
        
        
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
