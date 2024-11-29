const nodemailer = require('nodemailer');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

require("dotenv").config();
const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send('hello');
})

app.post("/contact", (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    service: req.body.service,
    message: req.body.message,
  }
  console.log(contact)

  const main = async (contact) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.APP_PASSWORD
      }
    });

    const mailOptions = {
      from: {
        name: contact.name,
        address: contact.email 
      },
      to: 'sackeyemmanuelfynn@gmail.com',
      subject: contact.service,
      text: contact.message,
      html: ''
    };

    const info = await transporter.sendMail(mailOptions, (error, information) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + information.response);
          res.send("Thank your for reaching us " + contact.name);
        }
      }); 

}

  main(contact)
})
 

app.listen(process.env.PORT, () => {
  console.log("server started on port 5000")
});
