const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=>{

    try{    

        const newAsset = {
            account: req.body.account_id,
            models: req.body.data.models,
            association: req.body.data.association,
            name: req.body.data.name,
            url: req.body.data.url,
            dateCreated: req.body.data.dateCreated,
            dateModified: req.body.data.dateModified
        }

        const asset = await Asset.create(newAsset);

        if(asset){
            res.status(200).json({message: `Asset ${asset.name} created`});
        }

    }catch(error){
        next(error);
    }

}