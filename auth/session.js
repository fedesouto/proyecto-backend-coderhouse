const MongoStore = require('connect-mongo')
const expressSession = require('express-session')
const { sessionSecret, mongodbUriSessions } = require('../config')

const session = expressSession({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: mongodbUriSessions,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    }),
    cookie: {
        maxAge: 60000
    }
})

module.exports = session