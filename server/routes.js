'use strict';

const express = require('express');
const app = module.exports = express.Router();
const authHeader = require('./lib/authHeader.js');
const User = require('./schema/User');

app.use(authHeader);


// (emailAddress, code) -> then or catch
const email = require('./lib/email');

app.post('/profile/signup', (req, res, next) => {

    res.body = res.body || {};
    res.body.vault = res.body.vault || {};

    let credentials = req.body.vault.auth.basic; 
    // username, email, password
    const newUser = new User({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
    });


    User.findOne({username: credentials['username']}).then((response) => {
        if (response) {
            res.body.vault = {
                signup: false,
                message: 'Username taken.'
            }

            res.send("Already created");
        } else {
            User.findOne({email: credentials['email']}).then(response => {
                if (response) {
                    res.body.vault = {
                        signup: false,
                        message: 'Email taken.'
                    }
                    res.send("Already created");
                } else {
                    newUser.hashPassword(newUser['password']).then(hash => {
                        newUser.password = hash.password;
                        newUser.user_id = hash.user_id;
                        newUser.verifyCode = hash.verifyCode;
                        newUser.save().then(response => {
                            res.body.vault.signup = true;
                            res.send("Done.")
                        });
                    })
                }
            })
        }
    })
  
});

app.get('*', (req, res, next) => {
    res.send("Testing Route");
});