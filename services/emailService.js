// services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

const sendWelcomeEmail = async (to, userName, password) => {
  const mailOptions = {
    from: `"TechInfuse" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🎉 Welcome to TechInfuse!',
    html: `
      <h2>Welcome, ${userName}!</h2>
      <p>Thank you for registering on <strong>TechInfuse</strong>.</p>
      <p><strong>Your login credentials:</strong></p>
      <ul>
        <li>Email: ${to}</li>
        <li>Password: ${password}</li>
      </ul>
      <p>Cheers,<br/>The TechInfuse Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to', to);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendWelcomeEmail;
