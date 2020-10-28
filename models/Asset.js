const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    models: {type: String, enum: ['Claim', 'Policy']},
    association: {type: mongoose.Schema.Types.ObjectId, refPath: 'models'},
    name: {type: String},
    url: {type: String},
    dateCreated: {type: String},
    dateModified: {type: String},
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;