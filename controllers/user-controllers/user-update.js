const User = require('../../models/User');

module.exports = async (req, res, next)=> {
    try{

        const newUserData = {};

        for (const key in req.body.data) {

            if(key === 'account'){
                return res.status('405').json({message: 'This action is not allowed.'});
            }

            newUserData[key] = req.body.data[key];
        }

        const updatedUser = await User.findByIdAndUpdate({_id: req.body.id}, newUserData, {new: true});

        if(updatedUser){
            res.status(200).json(updatedUser);
        }

    }catch(error){
        next(error)
    }
 }