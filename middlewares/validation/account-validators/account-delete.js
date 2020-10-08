const User = require('../../../models/User');
const { body, validationResult } = require('express-validator');

const rules = [
    body('id')
        .exists()
        .isAlphanumeric()
        .isLength({min: 24}),
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