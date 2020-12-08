const Asset = require('../../models/Asset');

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
        }

        const asset = await Asset.create(newAsset);

        if(asset){
            res.status(200).json({message: `Asset ${asset.name} created`});
        }

    }catch(error){
        next(error);
    }

}