const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=> {
    try{

        const newAssetData = {};

        for (const key in req.body.data) {
            newAssetData[key] = req.body.data[key];
        }

        const updatedAsset = await Asset.findByIdAndUpdate({_id: req.body.data.id}, newAssetData, {new: true});

        if(updatedAsset){
            res.status(200).json(updatedAsset);
        }

    }catch(error){
        next(error);
    }
 }