const Credential = require('../schema/Credential');

const credentialHelper = function (req, res, next) {
    this.findCredential = async (credentials) => {
        return await Credential.findOne({...credentials});
    };
    this.addCredential = async (user_id, credential) => {
        return;
    };
    this.findCredential = async (user_id, credential) => {
        return;
    };
    this.deleteCredential = async (user_id, credential) => {
        return;
    }
}

module.exports = new credentialHelper;