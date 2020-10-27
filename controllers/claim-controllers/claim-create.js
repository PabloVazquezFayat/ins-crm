const Claim = require('../../models/Claim');

module.exports = async (req, res, next)=>{

    try{

        const newClaim = {
            account: req.body.account_id,
            claimNumber: req.body.data.claimNumber,
            dateOfLoss: req.body.data.dateOfLoss,
            dateOfReport: req.body.data.dateOfReport,
            claimType: req.body.data.claimType,
            description: req.body.data.description,
            assets: req.body.data.assets
        }

        const claim = await Claim.create(newClaim);

        if(claim){
            res.status(200).json({message: `Claim ${claim.claimNumber} created`});
        }

    }catch(error){
        next(error);
    }

}