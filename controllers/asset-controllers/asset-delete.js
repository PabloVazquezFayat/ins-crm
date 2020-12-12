const Asset = require('../../models/Asset');
const Claim = require('../../models/Claim');
const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=> {
    try{

        const deletedAsset = await Asset.findOneAndDelete({_id: req.body.data.asset_id});

        const updatedClaimOrPolicy = 
            deletedAsset.models === 'Claim' ?
            await Claim.findByIdAndUpdate(deletedAsset.association, {$pull :{assets: req.body.data.asset_id}}) :
            await Policy.findByIdAndUpdate(deletedAsset.association, {$pull :{assets: req.body.data.asset_id}});

        if(deletedAsset && updatedClaimOrPolicy){
            res.status(200).json({message: `Asset deleted`});
        }else{
            res.status(404).json({message: `Asset not found`})
        }

    }catch(error){
        next(error);
    }
 }