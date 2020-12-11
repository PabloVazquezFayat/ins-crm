const User = require('../../models/User');
const Account = require('../../models/Account');
const Claim = require('../../models/Claim');
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

    body('data.claimNumber')
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter the client's first and last name"),

    body('data.dateOfLoss')
        .isString()
        .isLength({min:1})
        .withMessage("Please enter the business name"),

    body('data.dateOfReport')
        .isString()
        .isLength({min:1})
        .withMessage("Must be a valid email address."),
    
    body('data.claimType')
        .isString()
        .withMessage("Must be a string"),

    body('data.description')
        .isString()
        .withMessage("Must be a string"),

    body('data.assets')
        .not()
        .exists()
        .withMessage("Assets array not needed"),

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

    body('data.id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var claim = await Claim.findOne({_id: value});
            if(!claim) return Promise.reject();
            var account = await Account.findOne({_id: claim.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Client records do not exist"),

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

    body('data.id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var claim = await Claim.findOne({_id: value});
            if(!claim) return Promise.reject();
            var account = await Account.findOne({_id: claim.account});
            if(!account) return Promise.reject();
        })
        .withMessage("Client records do not exist"),

    body('data.claimNumber')
        .optional()
        .isString()
        .isLength({min: 1})
        .withMessage("Please enter the client's first and last name"),

    body('data.dateOfLoss')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter the business name"),

    body('data.dateOfReport')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Must be a valid email address."),
    
    body('data.claimType')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Must be a string"),

    body('data.description')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Must be a string"),

    body('data.assets')
        .optional() 
        .isArray()
        .withMessage("Must be an array of asset urls"),

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

    body('data.id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var claim = await Claim.findOne({_id: value});
            if(!claim) return Promise.reject();
            var account = await Account.findOne({_id: claim.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Client records do not exist"),
];

module.exports = {
    createRules,
    readRules,
    updateRules,
    deleteRules
}