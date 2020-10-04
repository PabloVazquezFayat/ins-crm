const Account = require('../../models/Account'); 

module.exports = async (req, res, next)=> {
    try{

        const account = await Account.findOne({_id: req.params.id})
        .populate({path: 'owner'})
        .populate({path: 'users'})

        if(account) return res.status(200).json(account);
        if(!account) return res.status(200).json({message: 'Account not found'});

    }catch(error){
        next(error)
    }
 }