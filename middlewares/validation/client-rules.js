const User = require('../../models/User');
const Account = require('../../models/Account');
const Client = require('../../models/Client');
const { body, param } = require('express-validator');

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

    body('data.name')
        .exists()
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter the client's first and last name"),

    body('data.businessName')
        .isString()
        .isLength({min:1})
        .withMessage("Please enter the business name"),

    body('data.email')
        .isString()
        .isEmail()
        .withMessage("Must be a valid email address."),
    
    body('data.phone')
        .isString()
        .withMessage("Must be a string"),

    body('data.address')
        .isString()
        .withMessage("Must be a string"),

    body('data.city')
        .isString()
        .withMessage("Must be a string"),
    
    body('data.state')
        .isString()
        .withMessage("Must be a string"),
    
    body('data.zipCode')
        .isString()
        .withMessage("Must be a string"),
    
    body('data.policies')
        .not()
        .exists()
        .withMessage("Policies is not needed"),

    body('data.claims')
        .not()
        .exists()
        .withMessage("Claims is not needed"),

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

    param('id')
        .optional()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var client = await Client.findOne({_id: value});
            if(!client) return Promise.reject();
            var account = await Account.findOne({_id: client.account})
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
            var client = await Client.findOne({_id: value});
            if(!client) return Promise.reject();
            var account = await Account.findOne({_id: client.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Client records do not exist"),

    body('data.name')
        .optional()
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter the client's first and last name"),

    body('data.businessName')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter the business name"),

    body('data.email')
        .optional()
        .isString()
        .isEmail()
        .withMessage("Must be a valid email address."),
    
    body('data.phone')
        .optional()
        .isString()
        .withMessage("Must be a string"),

    body('data.address')
        .optional()
        .isString()
        .withMessage("Must be a string"),

    body('data.city')
        .optional()
        .isString()
        .withMessage("Must be a string"),
    
    body('data.state')
        .optional()
        .isString()
        .withMessage("Must be a string"),
    
    body('data.zipCode')
        .optional()
        .isString()
        .withMessage("Must be a string"),
    
    body('data.policies')
        .optional()
        .isArray()
        .withMessage("Policies must be an array"),

    body('data.claims')
        .optional()
        .isArray()
        .withMessage("Claims must be an array"),

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
            var client = await Client.findOne({_id: value});
            if(!client) return Promise.reject();
            var account = await Account.findOne({_id: client.account})
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