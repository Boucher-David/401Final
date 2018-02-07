const express = require('express');
const app = module.exports = express.Router();
const authHeader = require('./lib/authHeader.js');
const User = require('./schema/User');
const Credential = require('./schema/Credential');
const emailVerify = require('./lib/email');
const to = require('./lib/to.js');

const userHelper = require('./lib/userHelper');
const credentialHelper = require('./lib/credentialHelper');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.body = res.body || {};
    res.body.vault = res.body.vault || {};
    return next();
});

app.use(authHeader);

// remove user to test signup
// app.use((req, res, next) => {
//     User.findOneAndRemove({username: 'username'}).then(response => {
//         return next();
//     });
// });

// create user to test signin
// app.use( async (req, res, next) => {
//     let newUser = new User({username: 'username', password: 'password', email: 'david_boucher@outlook.com'})

//     let [err, saved] = await to(newUser.save());
//     return next();
// });


// (emailAddress, code) -> then or catch


app.post('/profile/signup', async (req, res, next) => {

    res.body = res.body || {};
    res.body.vault = res.body.vault || {};
    res.body.vault.veriftSent = false;

    let credentials = req.body.vault.auth.basic; 
    // username, email, password
    const newUser = new User({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
    });
    return res.send(res.body);
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

    [err, user] = await to(userHelper.findUser({username: credentials['username']}));
    [err, email] = await to(userHelper.findUser({email: credentials['email']}));
    [err, credential] = await to(credentialHelper.findCredential(user.user_id));
    if (err) return res.send(res.body.vault);

    res.body.vault = {
        signin: true,
        user: user.user_id,
        logins: user.logins
    }

    return res.send(res.body.vault);

});

app.post('/profile/update/email', async (req, res, next) => {
    res.body.vault.update = false;
    if (!req.body.vault.auth.basic) return res.send("Done");
    let credentials = req.body.vault.auth.basic;

    [err, user] = await to(userHelper.findUser({user_id: credentials.user_id}));
    [err, email] = await to(userHelper.findUser({email: credentials.oldEmail}));
    [err, update] = await to(User.findOneAndUpdate(
        {user_id: credentials.user_id},
        {$set: {email: credentials.newEmail}},
        {new: true}
    ));

    if (!err) res.body.vault.update = true;
    return res.send("Done");

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
    if (!verifyUser) return res.send(res.body);

    let _user = await userHelper.findUser({verifyCode: req.params.id});

    let _credentials = await credentialHelper.findCredential({user_id: _user.user_id});

    if (!_credentials) {

        let newCredential = new Credential({user_id: _user.user_id, logins: {}});

        let [err, saved] = await to(newCredential.save());

    }
    if (verifyUser && _credentials) {
        return res.send(res.body);
    }

});

app.post('/credential/set',async (req, res, next) => {
    res.body.vault.saved = false;

    if (!req.body.vault.auth || !req.body.vault.auth.basic.user_id) return res.send("Done");

    [err, user] =  await to(userHelper.findUser({user_id: req.body.vault.auth.basic.user_id}));
    if (err) return res.send("Done");

    [err, credential] = await to(credentialHelper.findCredential(user._user_id));
    if (err) return res.send("Done");


    if (credential.logins[req.body.nickname]) return res.send("Done");

    let newCredentialList = credential.logins;
    newCredentialList[req.body.nickname] = req.body.credential;

    [err, saved] = await to(Credential.findOneAndUpdate(
        {user_id: req.body.vault.auth.basic.user_id},
        {$set: {logins: newCredentialList}},
        {new: true}
    ));

    

    if (err) return res.send("Done");



    let savedLogins = Object.keys(saved.logins);

    [err, user] = await to(User.findOneAndUpdate(
        {user_id: req.body.vault.auth.basic.user_id},
        {$set: {logins: savedLogins}},
        {new: true}
    ));

    res.body.vault.logins = user.logins || null;
    res.body.vault.saved = true;

    return res.send(res.body.vault);

});

app.get('/credential/get/:cred', async (req, res, next) => {
    res.body.vault.success = false;

    if (!req.body.vault.auth || !req.body.vault.auth.basic.user_id || !req.params.cred) return res.send("Done");

    [err, user] =  await to(userHelper.findUser({user_id: req.body.vault.auth.basic.user_id}));
    if (err) return res.send("Done");

    [err, credential] = await to(credentialHelper.findCredential(user._user_id));
    if (err) return res.send("Done");

    res.body.vault = {
        success: true,
        credential: credential.logins[req.params.cred]
    }

    return res.send(res.body.vault);

});

app.delete('/credential/delete/:cred', async (req, res, next) => {
    res.body.vault = {
        deleted: false
    }

    let [err, user] = await to(userHelper.findUser({user_id: req.body.vault.auth.basic.user_id})) || [err, user];
    [err, credential] = await to(credentialHelper.findCredential(user._user_id));

    if (err) return res.send("Done");

    if (!credential.logins[req.params.cred]) return res.send("Done");
    let newCredentialLoginList = {...credential.logins};
    delete newCredentialLoginList[req.params.cred];

    let filteredLogins = user.logins.filter(credential => credential !== req.params.cred);

    [err, updatedUser] = await to(User.findOneAndUpdate(
        {user_id: user.user_id},
        {$set: {logins: filteredLogins}},
        {new : true}
    ));

    [err, updatedCredential] = await to(Credential.findOneAndUpdate(
        {user_id: credential.user_id},
        {$set: {logins: newCredentialLoginList}},
        {new: true}
    ));

    res.body.vault = {
        deleted: true,
        logins: updatedUser.logins
    }


    res.send("Done.");
});

app.get('/*', async (req, res, next) => {
    res.send("testing");
    next();
});