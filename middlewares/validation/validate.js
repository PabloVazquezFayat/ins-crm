const { validationResult } = require('express-validator');

module.exports = (req, res, next)=> {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extractedErrors = errors.errors.map((error)=>{
        return { [error.param]: error.msg };
    });

    return res.status(422).json({errors: extractedErrors});

}