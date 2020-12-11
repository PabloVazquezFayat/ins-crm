const Claim = require('../../models/Claim');
const Client = require('../../models/Client');

module.exports = async (req, res, next)=>{

    try{

        const newClaim = {
            account: req.body.account_id,
            client: req.body.data.client_id,
            claimNumber: req.body.data.claimNumber,
            dateOfLoss: req.body.data.dateOfLoss,
            dateOfReport: req.body.data.dateOfReport,
            claimType: req.body.data.claimType,
            description: req.body.data.description
        }

        const claim = await Claim.create(newClaim);
        const updatedClient = await Client.findByIdAndUpdate(req.body.data.client_id, {$push: {claims: claim._id}})

        if(claim && updatedClient){
            res.status(200).json({message: `Claim ${claim.claimNumber} created`, data: claim});
        }

    }catch(error){
        next(error);
    }

}