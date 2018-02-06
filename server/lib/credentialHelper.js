const Credential = require('../schema/Credential');

const credentialHelper = function (req, res, next){
    this.findCredential = async (credentials) => {
        return await Credential.findOne({...credentials})
    };
}

module.exports = new credentialHelper;