

const express = require('express');
const app = module.exports = express.Router();
const authHeader = require('./lib/authHeader.js');
const User = require('./schema/User');

const userHelper = require('./lib/userHelper');

app.use(authHeader);

//Useful for testing signup. Deletes account before route is run.
// app.use((req, res, next) => {
//     User.findOneAndRemove({username: 'username'}).then(response => {
//         return next();
//     });
// });


// (emailAddress, code) -> then or catch
const email = require('./lib/email');


app.post('/profile/signup', async (req, res, next) => {

    res.body = res.body || {};
    res.body.vault = res.body.vault || {};

    let credentials = req.body.vault.auth.basic; 
    // username, email, password
    const newUser = new User({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
    });

    this._checkUsername = await userHelper.findUser({username: credentials['username']});
    this._checkEmail = await userHelper.findUser({email: credentials['email']});



    if (this._checkUsername || this._checkEmail) {
        res.body.vault = {
            signup: false,
            message: 'Account Taken.'
        }
        res.send("Account already taken.");
        return next();
    } else {
        newUser.hashPassword(newUser['password']).then(hash => {
            newUser.password = hash.password;
            newUser.user_id = hash.user_id;
            newUser.verify = false;
            newUser.verifyCode = hash.verifyCode;
            newUser.save().then(response => {
                res.body.vault.signup = true;

                // send verify code to verify account.

                res.send("Done.")
                return next();
            });
        })
    }
});

app.post('/profile/signin', async (req, res, next) => {
    let credentials = req.body.vault.auth.basic;

    res.body = res.body || {};
    res.body.vault = res.body.vault || {};
    res.body.vault.signin = false;


    this._checkUsername = await userHelper.findUser({username: credentials['username']});
    this._checkEmail = await userHelper.findUser({email: credentials['email']});

    if (this._checkUsername && this._checkEmail) {
        if (!this._checkUsername.verify) {
            res.body.vault = {
                signin: false,
                message: "User is unverified"
            };
            res.send(res.body.vault);
            return next();
        }

        this._checkPassword = await userHelper.compare(credentials['password'], this._checkUsername.password);
        if (this._checkPassword) {
            res.body.vault = {
                signin: true,
                user_id: this._checkUsername.user_id
            }
        }

        res.send(res.body.vault);
        return next();
    } else {
        res.send(res.body.vault);
        return next();
    }
});

app.get('/*', async (req, res, next) => {
    let _findUser = await userHelpers.findUser(credentials);

    res.send(_findUser);
});