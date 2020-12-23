const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async (req, res, next)=> {

    try{

        let token = req.headers.cookie

        if(token){
            token = token.split('=')[1];
        }
        
        if(token){
            jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded)=>{

                if(error){
                    return res.status(500).json({auth: false, message: 'Error authentication failed'});
                }

                const user = await User.findById(decoded.id);

                if(!user || !req.query.user_id){
                    return res.status(401).json({auth: false, message: 'User not found'});
                }

                if(user._id.toString() !== req.query.user_id.toString()){
                    return res.status(500).json({auth: false, message: 'Error authentication failed'});
                }
                
                next();

            });
        }else{
            return res.status(401).json({auth: false, message: 'Authentication failed'});
        }

    }catch(error){
        next(error);
    }

}