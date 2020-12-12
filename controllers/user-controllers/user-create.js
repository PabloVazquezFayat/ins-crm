const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Account = require('../../models/Account');

module.exports = async (req, res, next)=> {
    try{

        const hashedPassword = bcrypt.hashSync(req.body.data.password, 8);

        const newUserData = {
            account: req.body.account_id,
            name: req.body.data.name,
            email: req.body.data.email,
            password: hashedPassword,
            permissions: {
                admin: req.body.data.permissions.admin,
                create: req.body.data.permissions.create,
                read: req.body.data.permissions.read,
                update: req.body.data.permissions.update,
                delete: req.body.data.permissions.delete,
            },
        }

        const newUser = await User.create(newUserData);
        const updatedAccount = await Account.findByIdAndUpdate({_id: req.body.account_id}, {$push: {users: newUser._id}});

        if(newUser&& updatedAccount){
            res.status(200).json({message: `User ${newUserData.name} created`, data: newUser});
        }

    }catch(error){
        next(error);
    }
 }