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
            const sanitizedUser = sanitzeUser(newUser);
            const token = jwt.sign({id: newUser._id}, process.env.TOKEN_SECRET, {expiresIn: 86400});
            res.status(200).json({message: `Account created`, user: sanitizedUser, auth: true, token: token});
        }

    }catch(error){
        next(error);
    }
 }