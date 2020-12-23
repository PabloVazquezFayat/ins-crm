const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async (req, res, next)=> {

    try{

        console.log(req.headers.cookie);

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

                console.log(user);

                if(user){
                    req.body.user_id = user._id;
                    req.body.account_id = user.account;
                }

                if(!user){
                    return res.status(401).json({auth: false, message: 'User not found'});
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