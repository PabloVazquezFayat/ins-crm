const User = require('../../../models/User');
const { body, validationResult } = require('express-validator');

const rules = [

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
        .isEmpty(),

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

    body('admin.name')
        .isString(),

    body('admin.password')
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