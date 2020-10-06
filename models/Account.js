const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    email: {type: String, unique: true, required: true},
    pin: {type: Number, required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    cc: {
        name: {type: String, required: true},
        number: {type: Number, required: true},
        expires: {type: String, required: true},
        securityCode: {type: Number, required: true},
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;