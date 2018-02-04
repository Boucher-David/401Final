const Credential = require('../schema/Credential');

const credentialHelper = function (req, res, next) {
    this.findCredential = async (user_id) => {
        return await Credential.findOne({user_id: user_id});
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