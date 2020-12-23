const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async (req, res, next)=> {

    try{

        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(401).json({ auth: false, message: 'Incorrect email or password'});
        }

        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({false: false, message: 'Incorrect email or password'});
        }

        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 86400});
        
        const sanitizedUser = {
            _id: user._id,
            account: user.account,
            name: user.name,
            email: user.email,
            permissions: user.permissions
        };

        res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 86400000});
        res.status(200).json({user: sanitizedUser});

    }catch(error){
        next(error)
    }

}