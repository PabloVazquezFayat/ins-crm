const { body, validationResult } = require('express-validator');

const accountValidationRules = ()=> {
    return [
        body('email').isEmail(),
        body('password').isLength({min: 5})
    ]
}

const validate = (req, res, next)=> {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = errors.map((error)=>{
        return { [error.param]: error.message };
    });

    return res.status(422).json({errors: extractedErrors});

}

module.exports = {
    accountValidationRules,
    validate
}