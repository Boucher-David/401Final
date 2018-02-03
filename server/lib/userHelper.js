const User = require('../schema/User');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
var randomstring = require("randomstring");

const userHelper = function (req, res, next){
    this.findUser = async (credentials) => {
        return await User.findOne({...credentials})
    };
    this.compare = async (password, hash) => {
        return await bcrypt.compare(password, hash);
    };

    this.verifyCheck = async (code) => {
        let found = await User.findOne({verifyCode: code});
        if (!found) return false;
        if (found.verified) return true;
        let update = await User.findOneAndUpdate({verifyCode: code}, {$set:{verified: true}}, {new: true});
        return true;
    };

}

module.exports = new userHelper;