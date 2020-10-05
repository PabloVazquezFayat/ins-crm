const User = require('../../models/User');
const Account = require('../../models/Account')

module.exports = async (req, res, next)=> {
    try{

        const newUserData = {
            account: req.body.account,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            permissions: {
                admin: req.body.permissions.admin,
                create: req.body.permissions.create,
                read: req.body.permissions.read,
                update: req.body.permissions.update,
                delete: req.body.permissions.delete,
            },
        }

        const newUser = await User.create(newUserData);
        const updatedAccount = await Account .findByIdAndUpdate({_id: req.body.account}, {"$push": {"users": newUser._id}});

        if(newUser&& updatedAccount){
            res.status(200).json({message: `User ${newUserData.name} created`});
        }

    }catch(error){
        next(error)
    }
 }