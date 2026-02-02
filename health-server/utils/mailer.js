// utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ✅ Gmail transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Generic email sender
 */
export async function sendEmail({ to, subject, text }) {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      text,
    });
    console.log(`📩 Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Email sending error:", err.message);
  }
}

/**
 * ✅ Specialized email for “Personalized Messages Activated”
 */
export async function sendActivationEmail(to, name) {
  const subject = "✅ Personalized Health Messages Activated";
  const text = `Hello ${name || "User"},\n\nYour personalized health alerts have been successfully activated! 🎉
  
You’ll start receiving daily health reminders and preventive care tips based on your preferences.\n\n
Stay healthy and hydrated!\n\n– Smart Health Team`;

  await sendEmail({ to, subject, text });
}
