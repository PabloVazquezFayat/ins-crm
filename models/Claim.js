const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    claimNumber: {type: String},
    dateOfLoss: {type: String},
    dateOfReport: {type: String},
    claimType: {type: String},
    description: {type: String},
    assets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Asset'}]
});

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;