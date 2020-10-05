const Account = require('../../models/Account');

module.exports = async (req, res, next)=> {
    try{

        const newAccountData = {};

        for (const key in req.body) {
            newAccountData[key] = req.body[key];
        }

        const updatedAccount = await Account.findByIdAndUpdate({_id: req.body.id}, newAccountData, {new: true});

        if(updatedAccount){
            res.status(200).json(updatedAccount);
        }

    }catch(error){
        next(error)
    }
 }