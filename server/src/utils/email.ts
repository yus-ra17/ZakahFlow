import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,          // your zakahflow@gmail.com
    pass: process.env.EMAIL_APP_PASSWORD,  // your 16-character app password
  },
});

/**
 * Verify the transporter on server start
 */
export const verifyEmailTransporter = async () => {
  try {
    await emailTransporter.verify();
    console.log("✅ Email transporter is ready");
  } catch (error) {
    console.error("❌ Email transporter error:", error);
  }
};
