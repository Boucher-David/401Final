

const express = require('express');
const app = module.exports = express.Router();
const authHeader = require('./lib/authHeader.js');
const User = require('./schema/User');

const findUser = require('./lib/asyncHelpers');


app.use(authHeader);

// Useful for testing signup. Deletes account before route is run.
// app.use((req, res, next) => {
//     User.findOneAndRemove({username: 'username'}).then(response => {
//         return next();
//     });
// });


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
                        newUser.verify = false;
                        newUser.verifyCode = hash.verifyCode;
                        newUser.save().then(response => {
                            res.body.vault.signup = true;

                            // send verify code to verify account.

                            res.send("Done.")
                        });
                    })
                }
            })
        }
    })
  
});

app.post('/profile/signin', (req, res, next) => {
    let credentials = req.body.vault.auth.basic;

    res.body = res.body || {};
    res.body.vault = res.body.vault || {};
    res.body.vault.signin = false;

    User.findOne({username: credentials['username']}).then(response => {
        if (!response) return res.send("Done");
        if(!response.verified) {
            res.body.vault.message = "Account unverified";
            return res.send("Done");
        }

            User.findOne({email: credentials['email']}).then(user=> {
                if (!user) return res.send("Done");
                    response.compare(credentials['password'], response.password).then(response => {
                        if (response) {
                            res.body.vault.signin = true;
                            res.body.vault.user = user.user_id;
                        }
                        res.send("Done.");
                    });

            });

        
    });

});

app.get('/', async (req, res, next) => {
    let foundUser = await findUser({username: 'username', password: null});
    res.send(foundUser);
});