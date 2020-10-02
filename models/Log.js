const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;