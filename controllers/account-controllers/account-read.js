const Account = require('../../models/Account'); 

module.exports = async (req, res, next)=> {
    try{

        const account = await Account.findOne({_id: req.body.account_id})
        .populate({path: 'owner'})
        .populate({path: 'users'})

        if(account) return res.status(200).json(account);
        if(!account) return res.status(404).json({message: 'Account not found'});

    }catch(error){
        next(error)
    }
 }