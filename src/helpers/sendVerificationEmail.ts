import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Configure Nodemailer to use Gmail SMTP
    const transport = await nodemailer.createTransport({
      service: "gmail", // Use Gmail SMTP service
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password or Gmail password
      },
    });

    // Email details
    const receiver = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Recipient's email address
      subject: "WhisperSend | Verification Code",
      headers: {
        "List-Unsubscribe": `<mailto:${process.env.EMAIL_USER}>`,
      },
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hello, ${username}!</h2>
            <p>Your verification code for WhisperSend is:</p>
            <h3 style="color: green;">${verifyCode}</h3>
            <p>Please enter this code on the website to verify your email.</p>
            <p>Thank you!</p>
            <p style="font-size: 12px; color: gray;">
              WhisperSend | Your Company Address | <a href="mailto:${process.env.EMAIL_USER}">Contact Support</a>
            </p>
            <p style="font-size: 12px; color: gray;">If you didn’t request this, please ignore this email.</p>
          </div>
        </body>
      </html>
      `,
    };

    // Send email
    const result = await transport.sendMail(receiver);

    if (result.rejected.length > 0) {
      return { success: false, message: "Failed to send verification email." };
    }

    console.log(result, "Email sent successfully");

    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
