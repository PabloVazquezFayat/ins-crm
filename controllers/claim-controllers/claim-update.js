const Claim = require('../../models/Claim');

module.exports = async (req, res, next)=> {
    try{

        const newClaimData = {};

        for (const key in req.body.data) {
            if(key !== "client_id"){
                newClaimData[key] = req.body.data[key];
            }
        }

        const updatedClaim = await Claim.findByIdAndUpdate({_id: req.body.data.claim_id}, newClaimData, {new: true});

        if(updatedClaim){
            res.status(200).json(updatedClaim);
        }

    }catch(error){
        next(error);
    }
 }