const User = require('../../models/User');
const Account = require('../../models/Account');
const Policy = require('../../models/Policy');
const Client = require('../../models/Claim');
const { body, query } = require('express-validator');

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

    body('data.client_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage("Invalid client id")
        .custom(async(value)=> {
            var client = Client.findOne({_id: value});
            if(!client) return Promise.reject();
        })
        .withMessage("Client id does not exist"),

    body('data.lineOfBusiness')
        .optional()
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter a valid line of business"),

    body('data.policyNumber')
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid policy number"),

    body('data.carrier')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid carrier"),
    
    body('data.expirationDate')
        .optional() 
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid expiration date"),

    body('data.financeCompany')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid finance company"),
    
    body('data.policyPremium')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid policy premium"),

    body('data.descriptionOfOperations')
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid description of operations"),
    
    body('data.accords')
        .not()
        .exists()
        .withMessage("Accords not needed"),

    body('data.assets')
        .not()
        .exists()
        .withMessage("Assets not needed"),

];

const readRules = [

    query('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    query('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    query('id')
        .optional()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var policy = await Policy.findOne({_id: value});
            if(!policy) return Promise.reject();
            var account = await Account.findOne({_id: policy.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Policy records do not exist"),

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
    
    body('data.policy_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var policy = await Policy.findOne({_id: value});
            if(!policy) return Promise.reject();
            var account = await Account.findOne({_id: policy.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Policy records do not exist"),
    
    body('data.client_id')
        .not()
        .exists()
        .withMessage("Client id cannot be changed"),


    body('data.lineOfBusiness')
        .optional()
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter a valid line of business"),

    body('data.policyNumber')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid policy number"),

    body('data.carrier')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid carrier"),
    
    body('data.expirationDate')
        .optional() 
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid expiration date"),

    body('data.financeCompany')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid finance company"),
    
    body('data.policyPremium')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid policy premium"),

    body('data.descriptionOfOperations')
        .optional()
        .isString()
        .isLength({min:1})
        .withMessage("Please enter a valid description of operations"),
    
    body('data.accords')
        .optional()
        .isArray()
        .withMessage("Must be an array of accords"),

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

    body('data.policy_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            var policy = await Policy.findOne({_id: value});
            if(!policy) return Promise.reject();
            var account = await Account.findOne({_id: policy.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Policy records do not exist"),
];

module.exports = {
    createRules,
    readRules,
    updateRules,
    deleteRules
}