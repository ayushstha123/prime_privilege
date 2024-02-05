import nodemailer from 'nodemailer';

 const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      auth: {
        user: 'shreeshes227@gmail.com',
        pass: 'hxin rwym lhnt ixlj',
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'www.primepriviledge.com',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
export default mailSender;
