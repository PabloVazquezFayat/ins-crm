const User = require('../../models/User'); 
const sanitizeUser = require('../../utility/sanitize-user');

module.exports = async (req, res, next)=> {
    try{

        const user = await User.findOne({_id: req.params.user_id})
            .populate({path: 'account', select: '_id'});

        const sanitizedUser = sanitizeUser(user);

        if(user && sanitizedUser) return res.status(200).json(sanitizedUser);
        if(!user) return res.status(200).json({message: 'User not found'});

    }catch(error){
        next(error);
    }
 }