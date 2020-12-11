const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../../models/Account');
const User = require('../../models/User');

module.exports = async (req, res, next)=> {
    try{

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const newAccountData = {
            owner: req.body.owner,
            email: req.body.email,
            pin: req.body.pin,
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
            name: req.body.owner,
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

        const updatedAccount = await Account.findByIdAndUpdate({_id: newAccount._id}, {owner: newUser._id}, {new: true});

        if(updatedAccount && newUser){
            delete newUser.password;
            const token = jwt.sign({id: newUser._id}, process.env.TOKEN_SECRET, {expiresIn: 86400});
            res.status(200).json({message: `Account created`, user: newUser, auth: true, token: token});
        }

    }catch(error){
        next(error);
    }
 }