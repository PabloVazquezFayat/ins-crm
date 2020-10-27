const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=> {
    try{

        const policies = await Policy.find({account: req.body.account_id});

        if(policies){
            res.status(200).json(policies);
        }else{
            res.status(404).json({message: `No policies found`});
        }

    }catch(error){
        next(error);
    }
 }