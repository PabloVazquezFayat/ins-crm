const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { update } = require('../../models/Account');
const Account = require('../../models/Account');
const User = require('../../models/User');
const sanitzeUser = require('../../utility/sanitize-user');

module.exports = async (req, res, next)=> {
    try{

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const newAccountData = {
            email: req.body.email,
            users: [],
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
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            permissions: {
                admin: true,
                create: true,
                read: true,
                update: true,
                delete: true,
            }
        }

        const newUser = await User.create(newUserData);

        if(!newUser){
            return res.status(500);
        }

        const updatedAccount = await Account.findByIdAndUpdate({_id: newAccount._id}, {owner: newUser._id, users: newUser._id}, {new: true});

        if(updatedAccount && newUser){
            console.log('on to login');
            next();
        }

    }catch(error){
        next(error);
    }
 }