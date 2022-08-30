require("dotenv").config();

const firebaseServiceAccount = require("./coder-backend-5ae09-firebase-adminsdk-6rlzw-e7ab343996.json");
const mongodbUri = process.env.MONGODB_URI;
const mongodbUriSessions = process.env.MONGODB_URI_SESSIONS;
const sessionSecret = process.env.SESSION_SECRET;
const secret = process.env.SECRET;
const gmail_user = "federicogsouto@gmail.com";
const gmail_pass = process.env.APP_PASSWORD;
const twilio_user = process.env.TWILIO_USER
const twilio_token = process.env.TWILIO_TOKEN
const twilio_phone = process.env.TWILIO_PHONE
const admin_phone = process.env.ADMIN_PHONE
const twilio_wapp = process.env.TWILIO_WAPP

module.exports = {
  secret,
  sessionSecret,
  mongodbUri,
  mongodbUriSessions,
  gmail_user,
  gmail_pass,
  twilio_user,
  twilio_token,
  twilio_phone,
  admin_phone,
  twilio_wapp
};
