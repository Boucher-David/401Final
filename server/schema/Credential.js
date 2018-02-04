const mongoose = require('mongoose');

const Credential = new mongoose.Schema({
    user_id: {type: String, unique: true, required: true},
    logins: {type: Object, default: {}}  
})

module.exports = mongoose.model('Credential', Credential);