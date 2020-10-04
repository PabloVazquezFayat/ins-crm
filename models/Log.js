const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    date: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    action: {type: String, enum: ['created', 'read', 'updated', 'deleted']}
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;