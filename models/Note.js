const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    subject: {type: String},
    note: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;