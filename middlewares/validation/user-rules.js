const User = require('../../models/User');
const Account = require('../../models/Account');
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
        .withMessage('This action is not allowed user_id'),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid account')
        .custom(async(value)=> {
            var account = Account.findOne({_id: value});
            if(!account) return Promise.reject();
        })
        .withMessage('This action is not allowed account_id'),

    body('account')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid account')
        .custom(async(value)=> {
            var account = await Account.findOne({_id: value});
            if(!account) return Promise.reject();
        })
        .withMessage('This action is not allowed account'),

    body('name')
        .exists()
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter the user's first and last name"),

    body('email')
        .isEmail()
        .withMessage('Must be a valid email address.')
        .custom(async(value)=> {
            var user = await User.findOne({email: value});
            if(user)return Promise.reject();
        })
        .withMessage('Email is already in use.'),

    body('password')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{5,}$/, "i")
        .withMessage('Must contain at least 1 special character and 1 uppercase letter.')
        .isLength({min: 5})
        .withMessage('Must be minimum 5 characters long.'),

    body('permissions')
        .notEmpty(),

    body('permissions.admin')
        .isBoolean()
        .custom(async(value)=> {
            return value === true ? Promise.reject() : Promise.resolve() ;
        })
        .withMessage('Invalid input value'),
    
    body('permissions.create')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

    body('permissions.read')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

    body('permissions.update')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

    body('permissions.delete')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

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

    body('id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

];

const updateRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid user')
        .custom(async(value)=> {
            var user = User.findOne({_id: value});
            if(!user || user.account.toString() !== value.toString()) return Promise.reject();
        })
        .withMessage('This action is not allowed'),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Invalid account')
        .custom(async(value)=> {
            var account = Account.findOne({_id: value});
            if(!user) return Promise.reject();
        })
        .withMessage('This action is not allowed'),

    body('account')
        .not()
        .exists()
        .withMessage('This action is not allowed'),

    body('name')
        .optional()
        .isString()
        .isLength({min: 3})
        .withMessage("Please enter the user's first and last name"),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email address.')
        .custom(async(value)=> {
            var user = await User.findOne({email: value});
            if(user)return Promise.reject();
        })
        .withMessage('Email is already in use.'),

    body('password')
        .optional()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{5,}$/, "i")
        .withMessage('Must contain at least 1 special character and 1 uppercase letter.')
        .isLength({min: 5})
        .withMessage('Must be minimum 5 characters long.'),

    body('permissions')
        .optional()
        .isArray()
        .notEmpty()
        .withMessage('Permissions must an array'),

    body('permissions.admin')
        .optional()
        .isBoolean()
        .notEmpty()
        .custom((value)=> {
            if(value === true)return Promise.reject();
        })
        .withMessage('Invalid input value'),
    
    body('permissions.create')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

    body('permissions.read')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

    body('permissions.update')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

    body('permissions.delete')
        .isBoolean()
        .notEmpty()
        .withMessage('Invalid input value'),

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
];

module.exports = {
    createRules,
    readRules,
    updateRules,
    deleteRules
}