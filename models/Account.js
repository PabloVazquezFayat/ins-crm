const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    email: {type: String, unique: true, required: true},
    pin: {type: Number, minlength: 6, maxlength: 6, required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    cc: {
        name: {type: String},
        number: {type: String},
        expires: {type: String},
        securityCode: {type: String},
    },
    plan: {type: String, enum:['bronze', 'silver', 'gold']}
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;