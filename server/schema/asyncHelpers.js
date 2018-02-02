const User = require('./User');

module.exports = findUser = async (credentials) => {
    return  _user = await User.findOne({...credentials});
}