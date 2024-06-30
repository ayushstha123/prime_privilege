import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'; // Make sure to import jwt if you haven't already

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'shreeshes227@gmail.com',
    pass: 'hxin rwym lhnt ixlj',
  }
});

export const mailSender = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: 'www.primepriviledge.com',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Rethrow the error for handling in the caller
  }
};

export const resetMailSender = async (email, title,user) => {
  try {
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

    const info = await transporter.sendMail({
      from: 'www.primepriviledge.com',
      to: email,
      subject: title,
      html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:8000/reset_password/${user._id}/${token}">http://localhost:8000/reset_password/${user._id}/${token}</a>
      <p>The link will expire in 5 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    throw error; // Rethrow the error for handling in the caller
  }
};
