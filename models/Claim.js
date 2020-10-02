const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
});

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;