const User = require('../schema/User');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

const userHelper = function (req, res, next){
    this.findUser = async (credentials) => {
        return await User.findOne({...credentials})
    };
    this.compare = async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }

}

module.exports = new userHelper;