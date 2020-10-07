const User = require('../../../models/User');
const { body, validationResult } = require('express-validator');

const rules = [

    body('id')
        .isAlphanumeric(),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email address.')
        .custom(async(value)=> {
            const user = await User.findOne({email: value});
            if(user)return Promise.reject();
        })
        .withMessage('Email is already in use.'),

    body('pin')
        .optional()
        .isNumeric()
        .isLength({min: 4})
        .withMessage('Must be 4 digits long.'),

    body('users')
        .optional()
        .isArray()
        .custom(async(values)=> {
            const users = await User.find({_id: {$in: values}});
            if(!users) return Promise.reject();
        })
        .withMessage('User does not exist.'),

    body('cc.name')
        .optional()
        .isString()
        .withMessage('Must be at least 5 characters long.'),

    body('cc.number')
        .optional()
        .isNumeric()
        .isLength({min: 16}),

    body('cc.expires')
        .optional()
        .isString()
        .isLength({min: 7}),

    body('cc.securityCode')
        .optional()
        .isNumeric()
        .isLength({min: 3}),

    body('admin.name')
        .optional()
        .isString(),

    body('admin.password')
        .optional()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{5,}$/, "i")
        .withMessage('Must contain at least 1 special character and 1 uppercase letter.')
        .isLength({min: 5})
        .withMessage('Must be minimum 5 characters long.'),

];


const validate = (req, res, next)=> {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = errors.errors.map((error)=>{
        return { [error.param]: error.msg };
    });

    return res.status(422).json({errors: extractedErrors});

}

module.exports = {
    rules,
    validate
}