const Claim = require('../../models/Claim');

module.exports = async (req, res, next)=> {
    try{

        const claims = await Claim.find({account: req.body.account_id});

        if(claims){
            res.status(200).json(claims);
        }else{
            res.status(404).json({message: `No Claims found`});
        }

    }catch(error){
        next(error);
    }
 }