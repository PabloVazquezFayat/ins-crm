const User = require('../../models/User'); 

module.exports = async (req, res, next)=> {
    try{

        const user = await User.findOne({_id: req.params.id})
        .populate({path: 'account', select: '_id'})

        if(user) return res.status(200).json(user);
        if(!user) return res.status(200).json({message: 'User not found'});

    }catch(error){
        next(error)
    }
 }