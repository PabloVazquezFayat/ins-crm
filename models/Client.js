const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    name: {type: String},
    businessName: {type: String},
    email: {type: String, unique: true},
    phone: [{type: String}],
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zipCode: {type: String},
    policies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Policy'}],
    claims: [{type: mongoose.Schema.Types.ObjectId, ref: 'Claim'}],
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;