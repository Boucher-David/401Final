'use strict';

const express = require('express');
const app = module.exports = express.Router();
const authHeader = require('./lib/authHeader.js');
const User = require('./schema/User');

// (emailAddress, code) -> then or catch
const email = require('./lib/email');

app.post('/profile/signup', (req, res, next) => {
    res.body = res.body || {};
    res.body.vault = res.body.vault || {};

    authHeader(req);
    let credentials = req.body.vault.auth.basic; 
    // username, email, password
    const newUser = new User({
        username: credentials[0],
        email: credentials[1],
        password: credentials[2]
    });


    User.findOne({username: credentials[0]}).then((response) => {
        if (response) {
            res.body.vault.signup = false;
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
  
});

app.get('*', (req, res, next) => {
    res.send("Testing Route");
});