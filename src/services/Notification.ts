import nodeMailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const sendMail = (emailAddress : string, password : string) => {
  try {
    const transporter = nodeMailer.createTransport(
      smtpTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure:false,
        auth: {
          user: 'Tradiobtc@outlook.com',
          pass: 'Mudiagaukere1256',
          
        },
        tls: {
          ciphers:'SSLv3'
        },
        logger: true,
        debug: true
      })
    );
    const output = `
    Tradio Admin
     Admin account has successfully been created
     Your Password is : ${password}
     Your Email is : ${emailAddress}
  `;

    const mailOptions = {
      from: 'Tradiobtc@outlook.com',
      to: emailAddress,
      subject: 'Tradio Admin Account',
      text: output,
    };

    // send mail
    transporter.sendMail(mailOptions, (Error, info) => {
      if (Error) {
        console.log(Error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log('error occured in sendMail func: ', error);
  }
};

const sendPasswordRecoverMail = (token : string, emailAddress : string) => {
  try {
    const transporter = nodeMailer.createTransport(
      smtpTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure:false,
        auth: {
          user: 'Tradiobtc@outlook.com',
          pass: 'Mudiagaukere1256',
          
        },
        tls: {
          ciphers:'SSLv3'
        },
        logger: true,
        debug: true
      })
    );
    const link = `https://adoring-jepsen-5ed0f3.netlify.app/resetPasswrod/${token}`;
    const output = `
    Tradio
    Click on the Link below to reset your Password
    ${link}
  `;
    const mailOptions = {
      from: 'Tradiobtc@outlook.com',
      to: emailAddress,
      subject: 'Password Reset',
      text: output,
    };

    // send mail
    transporter.sendMail(mailOptions, (Error, info) => {
      if (Error) {
        console.log(Error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log('error occured in sendMail func: ', error);
  }
};
export { sendMail, sendPasswordRecoverMail };
