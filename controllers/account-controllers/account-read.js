const Account = require('../../models/Account'); 

module.exports = async (req, res, next)=> {
    try{

        const account = await Account.findOne({_id: req.query.account_id})
        .populate({path: 'owner', select:['_id', 'name', 'email', 'permissions']})
        .populate({path: 'users', select:['_id', 'name', 'email', 'permissions']});

        if(account) return res.status(200).json(account);
        if(!account) return res.status(404).json({message: 'Account not found'});

    }catch(error){
        next(error)
    }
 }