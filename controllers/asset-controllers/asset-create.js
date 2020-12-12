const Asset = require('../../models/Asset');
const Claim = require('../../models/Claim');
const Policy = require('../../models/Policy');

module.exports = async (req, res, next)=>{

    try{    

        const newAsset = {
            account: req.body.account_id,
            models: req.body.data.models,
            association: req.body.data.association,
            dateCreated: req.body.data.dateCreated,
            dateModified: req.body.data.dateModified,
            name: `${req.file.public_id.split('/')[1]}.${req.file.format}`,
            url: req.file.url,
            cloudData: req.file
        };

        const asset = await Asset.create(newAsset);

        const updatedClaimOrPolicy = 
            req.body.data.models === 'Claim' ?
            await Claim.findByIdAndUpdate(req.body.data.association, {$push :{assets: asset._id}}) :
            await Policy.findByIdAndUpdate(req.body.data.association, {$push :{assets: asset._id}});

        if(asset && updatedClaimOrPolicy){
            res.status(200).json({message: `Asset ${asset.name} created`, data: asset});
        };

    }catch(error){
        next(error);
    }

}