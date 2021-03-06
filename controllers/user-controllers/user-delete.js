const User = require('../../models/User');
const Account = require('../../models/Account')

module.exports = async (req, res, next)=> {
    try{

        const user = await User.findOneAndDelete({_id: req.body.data.id});
        const updatedAccount = await Account.findByIdAndUpdate({_id: req.body.account_id}, {$pull: {users: req.body.data.id}});

        if(user && updatedAccount){
            res.status(200).json({message: `User ${user.name} deleted`});
        }else{
            res.status(404).json({message: 'User not found'});
        }

    }catch(error){
        next(error);
    }
 }