const Account = require('../../models/Account');

module.exports = async (req, res, next)=> {
    try{

        const newAccountData = {};

        for (const key in req.body.data) {
            newAccountData[key] = req.body.data[key];
        }

        const updatedAccount = await Account.findByIdAndUpdate({_id: req.body.account_id}, newAccountData, {new: true})
        .populate({path: 'users', select:['_id', 'name', 'email', 'permissions']});

        if(updatedAccount){
            res.status(200).json(updatedAccount);
        }

    }catch(error){
        next(error)
    }
 }