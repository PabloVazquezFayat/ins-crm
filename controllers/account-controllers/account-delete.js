const { findByIdAndRemove } = require('../../models/Account');
const Account = require('../../models/Account');
const User = require('../../models/User'); 

module.exports = async (req, res, next)=> {
    try{

        const account = await Account.findByIdAndDelete(req.body.account_id);

        if(account){
            await User.deleteMany({account: account._id})
            return res.status(200).json({message: 'Account deleted'});
        }

        if(!account){
            returnres.status(200).json({message: 'Account not found'});
        }

    }catch(error){
        next(error);
    }
 }
