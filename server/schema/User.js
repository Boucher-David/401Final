const mongoose = require('mongoose');

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const uuid = require('uuid');
var randomstring = require("randomstring");

const User = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user_id: {type: String, unique: true},
    loggedIn: {type: String},
    verified: {type: Boolean, default: false},
    verifyCode: {type: String},
    logins: {type: Array}
});


User.methods.change = (field, newValue) => {
    if (field === 'password') return;
    if (field === 'user_id') return;
    this[field] = newValue;
    return this;
}

User.methods.hashPassword = (password) => {
    return bcrypt.hashAsync(password, 10).then(hash => {
        this.password = hash;
        this.user_id = uuid();
        this.verifyCode = randomstring.generate({length: 100});
        return this;
    });
}

User.methods.compare = (password, hash) => {
    return bcrypt.compare(password, hash).then ((res) => {
        return res;
    });
}


module.exports = mongoose.model('User', User);