const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    lineOfBusiness: {type: String},
    policyNumber: {type: String},
    carrier: {type: String},
    expirationDate: {type: String},
    financeCompany: {type: String},
    policyPremium: {type: Number},
    descriptionOfOperations: {type: String},
    accords: [{type: mongoose.Schema.Types.ObjectId, ref: 'Accord'}],
    assets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Asset'}]
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;