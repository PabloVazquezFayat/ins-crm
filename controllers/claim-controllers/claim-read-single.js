const Claim = require('../../models/Claim');

module.exports = async (req, res, next)=> {
    try{

        const claim = await Claim.findOne({_id: req.params.id})

        if(claim){
            res.status(200).json(claim);
        }else{
            res.status(404).json({message: `Claim not found`});
        }

    }catch(error){
        next(error);
    }
 }