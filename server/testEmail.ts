import dotenv from "dotenv";
import { emailTransporter } from "./src/utils/email";

dotenv.config();

const sendTestEmail = async () => {
  try {
    const info = await emailTransporter.sendMail({
      from: ` <${process.env.EMAIL_USER}>`, // sender name & email
      to: "mohammedyusra407@gmail.com", // replace with your real email to test
      subject: "Test Email from Zakah Flow",
      text: "Hello! This is a test email from Zakah Flow.",
      html: "<p>Hello! This is a <b>test email</b> from Zakah Flow.</p>",
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};
sendTestEmail();
