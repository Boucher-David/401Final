

const express = require('express');
const app = module.exports = express.Router();
const authHeader = require('./lib/authHeader.js');
const User = require('./schema/User');
const Credential = require('./schema/Credential');
const emailVerify = require('./lib/email');
const userHelper = require('./lib/userHelper');
const credentialHelper = require('./lib/credentialHelper');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));


app.use((req, res, next) => {
    res.body = res.body || {};
    res.body.vault = res.body.vault || {};
    return next();
});

app.use(authHeader);

//Useful for testing signup. Deletes account before route is run.
// app.use((req, res, next) => {

//     User.findOneAndRemove({username: 'username'}).then(response => {
//         let newUser = new User({
//             username: 'username',
//             password: 'password',
//             email: 'david_boucher@outlook.com'
//         });

//         newUser.hashPassword(newUser['password']).then(hash => {
//             newUser.password = hash.password;
//             newUser.user_id = hash.user_id;
//             newUser.verified = false;
//             newUser.verifyCode = hash.verifyCode;
//             newUser.save().then(response => {
//                 res.body.vault.signup = true;
//                 return next();
//             });
//         })
//     });
// });


// (emailAddress, code) -> then or catch


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
            newUser.verified = false;
            newUser.verifyCode = hash.verifyCode;
            newUser.save().then(response => {
                let newCredential = new Credential
                res.body.vault.signup = true;

                emailVerify(newUser.email, newUser.verifyCode).then(response => {
                    res.body.vault.verifySent = response.sent;
                    res.send(res.body.vault);
                    return next();
                }).catch(error => {
                    res.body.vault.verifySent = error.sent;
                    res.send(res.body.vault);
                    return next();
                })
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
    let _credential = await credentialHelper.findCredential(this._checkUsername.user_id);
    console.log(_credential.logins);

    if (this._checkUsername && this._checkEmail) {
        if (!this._checkUsername.verified) {
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

app.post('/profile/update/email', async (req, res, next) => {

    let credentials = req.body.vault.auth.basic || false;
    if (!credentials) {
        res.body.vault = {
            update: false
        }
        res.send(res.body.vault);
        return next();
    }

    this._findUser = await userHelper.findUser({user_id: credentials.user_id});

    if (!this._findUser) {
        res.body.vault = {
            update: false
        }
        res.send(res.body.vault);
        return next();
    }

    this._findEmail = await userHelper.findUser({email: credentials.oldEmail});
    if (!this._findEmail) {
        res.body.vault = {
            update: false
        }
        res.send(res.body.vault);
        return next();
    }

    this._update = await User.findOneAndUpdate({user_id: credentials.user_id},{$set: {email: credentials.newEmail}},{new: true});

    res.body.vault = {
        update: true
    }
    res.send("Done.")
    next();

});

app.post('/profile/update/password', async (req, res, next) => {

    let credentials = req.body.vault.auth.basic || false;
    if (!credentials) {
        res.body.vault = {
            update: false
        }
        res.send(res.body.vault);
        return next();
    }

    this._findUser = await userHelper.findUser({user_id: credentials.user_id});
    if (!this._findUser) {
        res.body.vault = {
            update: false
        }
        res.send(res.body.vault);
        return next();
    }

    this._verify = await userHelper.compare(credentials.oldPassword, this._findUser.password);
    
    if (!this._verify) {
        res.body.vault = {
            update: false
        }
        res.send(res.body.vault);
        return next();
    }
    let newPassword = await bcrypt.hashAsync(credentials.newPassword, 10);
    let updatedUser = await User.findOneAndUpdate({user_id: credentials.user_id},{$set: {password: newPassword}},{new: true});

    res.body.vault = {
        update: true
    };
    res.send("Done");
    return next();
});


app.get('/verify/:id', async (req, res, next) => {
    let verifyUser = await userHelper.verifyCheck(req.params.id);
    res.body.vault.verified = verifyUser;
    let _user = await userHelper.findUser({verifyCode: req.params.id});
    if (verifyUser) {
        let _credential = await credentialHelper.findCredential(_user.user_id);
        if (_credential) {
            res.send("Done.");
            return next();
        } else {
            let newCredential = new Credential({user_id: _user.user_id, logins: {}});
            let saved = await newCredential.save();
            res.send("Done.");
            return next();
        }
    } else {
        res.send("Done.");
        return next();
    }

});

app.get('*', async (req, res, next) => {
    res.send("testing");
    next();
});