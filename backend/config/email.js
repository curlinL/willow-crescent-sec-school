// backend/config/email.js
const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendVerificationEmail = async (email, username, verificationToken) => {
  const transporter = createTransporter();
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationLink = `${baseUrl}?verify=${verificationToken}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Willow Crescent Secondary" <noreply@willowcrescent.edu>',
    to: email,
    subject: 'Verify Your Admin Account - Willow Crescent Secondary School',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d6efd;">Welcome to Willow Crescent Secondary School Admin Portal</h2>
        <p>Hello <strong>${username}</strong>,</p>
        <p>Thank you for registering as an administrator. Please verify your email address to activate your account.</p>
        <p style="margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #0d6efd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </p>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationLink}</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This verification link will expire in 24 hours. If you did not create this account, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 11px;">Willow Crescent Secondary School</p>
      </div>
    `,
    text: `Welcome to Willow Crescent Secondary School Admin Portal\n\nHello ${username},\n\nThank you for registering as an administrator. Please verify your email address to activate your account.\n\nVerification Link: ${verificationLink}\n\nThis verification link will expire in 24 hours. If you did not create this account, please ignore this email.\n\nWillow Crescent Secondary School`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
