const User = require('../../models/User');
const Account = require('../../models/Account');
const Note = require('../../models/Note');
const { body } = require('express-validator');

const createRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid user')
        .custom(async(value)=> {
            var user = await User.findOne({_id: value})
                .populate({path: "account"});
            if(!user || user.account.owner.toString() !== value.toString())return Promise.reject();
        })
        .withMessage("This action is not allowed user_id"),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage("Invalid account")
        .custom(async(value)=> {
            var account = Account.findOne({_id: value});
            if(!account) return Promise.reject();
        })
        .withMessage("This action is not allowed account_id"),

    body('data.subject')
        .optional()
        .isString()
        .isLength({min: 1})
        .withMessage("Please enter a valid subject"),

    body('data.note')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid note"),

];

const readRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    body('data.note_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var note = await Note.findOne({_id: value});
            if(!note) return Promise.reject();
            var account = await Account.findOne({_id: note.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Note does not exist"),

];

const updateRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid user')
        .custom(async(value)=> {
            var user = await User.findOne({_id: value})
                .populate({path: "account"});
            if(!user || user.account.owner.toString() !== value.toString())return Promise.reject();
        })
        .withMessage("This action is not allowed user_id"),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage("Invalid account")
        .custom(async(value)=> {
            var account = Account.findOne({_id: value});
            if(!account) return Promise.reject();
        })
        .withMessage("This action is not allowed account_id"),
    
    body('data.note_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var note = await Note.findOne({_id: value});
            if(!note) return Promise.reject();
            var account = await Account.findOne({_id: note.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Note does not exist"),

    body('data.subject')
        .optional()
        .isString()
        .isLength({min: 1})
        .withMessage("Please enter a valid subject"),

    body('data.note')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid note"),
];

const deleteRules = [
    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    body('data.note_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var note = await Note.findOne({_id: value});
            if(!note) return Promise.reject();
            var account = await Account.findOne({_id: note.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Note does not exist"),
];

module.exports = {
    createRules,
    readRules,
    updateRules,
    deleteRules
}