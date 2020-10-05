const Account = require('../../models/Account');
const User = require('../../models/User');

module.exports = async (req, res, next)=> {
    try{

        const newAccountData = {
            owner: req.body.owner,
            email: req.body.email,
            pin: req.body.pin,
            users: req.body.users,
            cc: {
                name: req.body.cc.name,
                number: req.body.cc.number,
                expires: req.body.cc.expires,
                securityCode: req.body.cc.securityCode,
            }
        }

        const newAccount = await Account.create(newAccountData);

        if(!newAccount){
            return res.status(500);
        }

        const newUserData = {
            account: newAccount._id,
            name: req.body.admin.name,
            email: req.body.email,
            password: req.body.admin.password,
            permissions: {
                admin: true,
                create: true,
                read: true,
                update: true,
                delete: true,
            },
        }

        const newUser = await User.create(newUserData);

        if(!newUser){
            return res.status(500);
        }

        const updatedAccount = await Account.findByIdAndUpdate({_id: newAccount._id}, {owner: newUser._id}, {new: true});

        if(updatedAccount && newUser){
            res.status(200).json({message: `Account created`});
        }

    }catch(error){
        console.log(error);
        next(error)
    }
 }