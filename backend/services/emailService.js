// backend/services/emailService.js
import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = async () => {
  if (process.env.NODE_ENV === 'production') {
    // Production email service (e.g., Gmail, SendGrid, Mailgun)
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Development - use Ethereal Email for testing (no real emails sent)
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

// Send email verification
export const sendVerificationEmail = async (user, token) => {
  try {
    const transporter = await createTransporter();

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@sparkin.com',
      to: user.email,
      subject: 'Verify Your SparkIn Account',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">⚡ SparkIn</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Welcome to the community!</p>
          </div>

          <div style="padding: 40px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${user.username}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Thanks for joining SparkIn! To get started, please verify your email address by clicking the button below:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}"
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 15px 30px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;">
                Verify Email Address
              </a>
            </div>

            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              If you didn't create an account with SparkIn, you can safely ignore this email.
            </p>

            <p style="color: #999; font-size: 14px;">
              This link will expire in 24 hours.
            </p>
          </div>

          <div style="padding: 20px; background: #e9ecef; text-align: center;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} SparkIn. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (user, token) => {
  try {
    const transporter = await createTransporter();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@sparkin.com',
      to: user.email,
      subject: 'Reset Your SparkIn Password',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">⚡ SparkIn</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Password Reset Request</p>
          </div>

          <div style="padding: 40px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${user.username}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              We received a request to reset your password. Click the button below to create a new password:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}"
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 15px 30px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;">
                Reset Password
              </a>
            </div>

            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>

            <p style="color: #999; font-size: 14px;">
              This link will expire in 10 minutes for security reasons.
            </p>
          </div>

          <div style="padding: 20px; background: #e9ecef; text-align: center;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              © ${new Date().getFullYear()} SparkIn. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};
