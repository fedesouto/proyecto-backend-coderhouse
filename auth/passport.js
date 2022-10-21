const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { UsuariosDao } = require("../daos/index");
const User = require("../models/User");

passport.use(
    "signup",
    new LocalStrategy({ passReqToCallback: true },
        async(req, username, password, callback) => {
            const user = await UsuariosDao.find("username", username);
            if (user) {
                return callback(new Error("Ya existe un usuario con ese email"), false);
            } else {
                const newUser = new User({
                    username: username,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    phone: req.body.phone,
                    avatar: `http://${req.headers.host}/public/images/${req.file.filename}`
                });
                await UsuariosDao.addItem(newUser);
                return callback(null, newUser);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy({ passReqToCallback: true },
        async(_req, username, password, callback) => {
            const user = await UsuariosDao.find("username", username);
            if (!user || !bcrypt.compareSync(password, user.password)) {
                callback(new Error("Los datos ingresados son incorrectos"));
            } else {
                return callback(null, user);
            }
        }
    )
);

passport.serializeUser((user, callback) => {
    callback(null, { id: user.id, username: user.username });
});

passport.deserializeUser(async(usr, callback) => {
    try {
        const user = await UsuariosDao.find("username", usr.username);
        return callback(null, user);
    } catch (error) {
        return callback(error, false);
    }
});