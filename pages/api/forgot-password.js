import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Tuncay Tetik" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password.\n\nhttp://0.0.0.0:3439/reset-password?token=${token}`,
      html: `<b>You requested a password reset. Click the link below to reset your password.</b><br><a href="http://0.0.0.0:3439/reset-password?token=${token}">Reset Password</a>`
    });

    console.log('Message sent: %s', info.messageId);

    res.status(200).json({ message: 'Password reset email sent' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}