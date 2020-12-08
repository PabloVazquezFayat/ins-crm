const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=> {
    try{

        const newAssetData = {};

        for (const key in req.body.data) {
            if(newAssetData[key] !== 'asset_id'){
                newAssetData[key] = req.body.data[key];
            }
        }

        if(req.asset){
            newAssetData.cloudData = req.asset
        }

        const updatedAsset = await Asset.findByIdAndUpdate({_id: req.body.data.asset_id}, newAssetData, {new: true});

        if(updatedAsset){
            res.status(200).json(updatedAsset);
        }

    }catch(error){
        next(error);
    }
 }