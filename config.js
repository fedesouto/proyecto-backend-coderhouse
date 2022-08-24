require('dotenv').config()

const firebaseServiceAccount = require('./coder-backend-5ae09-firebase-adminsdk-6rlzw-e7ab343996.json')
const mongodbUri = process.env.MONGODB_URI
const mongodbUriSessions = process.env.MONGODB_URI_SESSIONS
const sessionSecret = process.env.SESSION_SECRET
const secret = process.env.SECRET

module.exports = {secret, sessionSecret, mongodbUri, mongodbUriSessions}