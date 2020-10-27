const Claim = require('../../models/Claim');

module.exports = async (req, res, next)=> {
    try{

        const deletedClaim = await Claim.findOneAndDelete({_id: req.body.data.id});

        if(deletedClaim){
            res.status(200).json({message: `Claim deleted`});
        }else{
            res.status(404).json({message: `Claim not found`})
        }

    }catch(error){
        next(error);
    }
 }