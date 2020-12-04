const User = require('../../models/User');
const Account = require('../../models/Account');
const Asset = require('../../models/Asset');
const { body } = require('express-validator');

const createRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid user')
        .custom(async(value)=> {
            const user = await User.findOne({_id: value})
                .populate({path: "account"});
            if(!user || user.account.owner.toString() !== value.toString())return Promise.reject();
        })
        .withMessage("This action is not allowed user_id"),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage("Invalid account")
        .custom(async (value)=> {
            const account = Account.findOne({_id: value});
            if(!account) return Promise.reject();
        })
        .withMessage("This action is not allowed account_id"),

    body('data.models')
        .isString()
        .isLength({min: 5})
        .withMessage("Invalid association model"),

    body('data.association')
        .isString()
        .isLength({min: 24})
        .withMessage("Invalid association id"),
    
    body('data.dateCreated')
        .isString()
        .isLength({min: 10})
        .withMessage("Please enter a valid date"),

    body('data.dateModified')
        .isString()
        .isLength({min: 10})
        .withMessage("Please enter a valid date")

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

];

const readSingleRules = [

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
            const asset = await Asset.findOne({_id: value});
            if(!asset) return Promise.reject();
            const account = await Account.findOne({_id: asset.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Asset does not exist"),

];

const updateRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid user')
        .custom(async(value)=> {
            const user = await User.findOne({_id: value})
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
            const account = Account.findOne({_id: value});
            if(!account) return Promise.reject();
        })
        .withMessage("This action is not allowed account_id"),

    body('data.id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .custom(async (value)=>{
            const asset = await Asset.findOne({_id: value});
            if(!asset) return Promise.reject();
            const account = await Account.findOne({_id: asset.account});
            if(!account) return Promise.reject();
        })
        .withMessage("Asset does not exist"),
    
    body('data.name')
        .optional()
        .isString()
        .isLength({min: 1})
        .withMessage("Please enter a valid name")
        .custom(async (value)=> {
            const extension = value.split('.')[value.split('.').length - 1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'pdf' && extension !== 'png'){
                return Promise.reject();
            }
        })
        .withMessage("File extension not supported, please use .jpg, .jpeg, or .pdf"),

    body('data.url')
        .not()
        .exists()
        .withMessage("Asset url cannot be modified"),

    body('data.dateCreated')
        .not()
        .exists()
        .withMessage("Asset date of creation cannot be modified"),

    body('data.dateModified')
        .optional()
        .isString()
        .isLength({min: 10})
        .withMessage("Please enter a valid date"),

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
            const asset = await Asset.findOne({_id: value});
            if(!asset) return Promise.reject();
            const account = await Account.findOne({_id: asset.account})
            if(!account) return Promise.reject();
        })
        .withMessage("Asset does not exist")

];

module.exports = {
    createRules,
    readRules,
    readSingleRules,
    updateRules,
    deleteRules
}