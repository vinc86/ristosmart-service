import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Client from "../../../client_secret_1069227264063-p342j79qmv5ibqlbd193tur975m46i50.apps.googleusercontent.com.json";

export const sendAccessEmailToUser = async (
  email: string,
  firstName: string,
  password: string
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "eshairdresser.test@gmail.com",
      pass: "admintest1",
      clientId: Client.web.client_id,
      clientSecret: Client.web.client_secret,
      refreshToken:
        "1//049CykS1Gyz-bCgYIARAAGAQSNwF-L9IrNOMsBapL-0-turEmpt2pLXcTnIDOSspDBGTYutueFKIqMxWDD7Jmvm8gzzttlAT241M",
    },
  } as SMTPTransport.Options);

  let mailOptions = {
    from: "eshairdresser.test@gmail.com",
    to: email,
    subject: "Registrazione account su Es-Hairdresser",
    text: `Ciao ${firstName}!
Il tuo account é stato creato sul portale di ES-Hairdresser.
Utilizza la tua email e la tua password temporanea ${password} per accedere e non dimenticare di sostituirla!

Ti aspettiamo nel nostro salone!

Il tuo team

Es-Hairdresser`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
