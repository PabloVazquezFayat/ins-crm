const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    permissions: {
        admin: {type: Boolean, default: false},
        create: {type: Boolean, default: false},
        read:   {type: Boolean, default: true},
        update: {type: Boolean, default: false},
        delete: {type: Boolean, default: false},
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;