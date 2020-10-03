const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accordSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
});

const Accord = mongoose.model('Accord', accordSchema);

module.exports = Accord;