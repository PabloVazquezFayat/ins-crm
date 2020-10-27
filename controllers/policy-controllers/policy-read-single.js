const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=> {
    try{

        const policy = await Policy.findOne({_id: req.params.id})

        if(policy){
            res.status(200).json(policy);
        }else{
            res.status(404).json({message: `Policy not found`});
        }

    }catch(error){
        next(error);
    }
 }