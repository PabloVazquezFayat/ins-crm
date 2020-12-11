const User = require('../../models/User');
const { body } = require('express-validator');

const createRules = [

    body('owner')
        .not()
        .exists()
        .withMessage('Account owner is not needed.'),

    body('email')
        .isEmail()
        .withMessage('Must be a valid email address.')
        .custom(async(value)=> {
            var user = await User.findOne({email: value});
            if(user)return Promise.reject();
        })
        .withMessage('Email is already in use.'),

    body('pin')
        .isNumeric()
        .isLength({min: 4})
        .withMessage('Must be 4 digits long.'),

    body('users')
        .not()
        .exists()
        .withMessage('Account users is not needed.'),

    body('cc.name')
        .isString()
        .withMessage('Must be at least 5 characters long.'),

    body('cc.number')
        .isNumeric()
        .isLength({min: 16}),

    body('cc.expires')
        .isString()
        .isLength({min: 7}),

    body('cc.securityCode')
        .isNumeric()
        .isLength({min: 3}),

    body('password')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{5,}$/, "i")
        .withMessage('Must contain at least 1 special character and 1 uppercase letter.')
        .isLength({min: 5})
        .withMessage('Must be minimum 5 characters long.'),

];

const readRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage("Reques must include user_id"),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24})
        .withMessage('Request must include accont_id'),

];

const updateRules = [

    body('user_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    body('account_id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),

    body('data.email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email address.')
        .custom(async(value)=> {
            const user = await User.findOne({email: value});
            if(user)return Promise.reject();
        })
        .withMessage('Email is already in use.'),

    body('data.pin')
        .optional()
        .isNumeric()
        .isLength({min: 4})
        .withMessage('Must be 4 digits long.'),

    body('data.users')
        .optional()
        .isArray()
        .custom(async(values)=> {
            const users = await User.find({_id: {$in: values}});
            if(!users) return Promise.reject();
        })
        .withMessage('User does not exist.'),

    body('data.cc.name')
        .optional()
        .isString()
        .withMessage('Must be at least 5 characters long.'),

    body('data.cc.number')
        .optional()
        .isNumeric()
        .isLength({min: 16}),

    body('data.cc.expires')
        .optional()
        .isString()
        .isLength({min: 7}),

    body('data.cc.securityCode')
        .optional()
        .isNumeric()
        .isLength({min: 3}),

    body('data.name')
        .optional()
        .isString(),

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