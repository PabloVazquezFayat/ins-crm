const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
});

const Policy = mongoose.model('Ph', policySchema);

module.exports = Policy;