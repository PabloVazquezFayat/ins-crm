const Claim = require('../../models/Claim');
const Client = require('../../models/Client');

module.exports = async (req, res, next)=> {
    try{

        const deletedClaim = await Claim.findOneAndDelete({_id: req.body.data.claim_id});
        const updatedClient = await Client.findByIdAndUpdate(req.body.data.client_id, {$pull: {claims: req.body.data.claim_id}});

        if(deletedClaim && updatedClient){
            res.status(200).json({message: `Claim deleted`});
        }else{
            res.status(404).json({message: `Claim not found`})
        }

    }catch(error){
        next(error);
    }
 }