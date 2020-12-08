const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=> {
    try{

        const deletedAsset = await Asset.findOneAndDelete({_id: req.body.data.asset_id});

        if(deletedAsset){
            res.status(200).json({message: `Asset deleted`});
        }else{
            res.status(404).json({message: `Asset not found`})
        }

    }catch(error){
        next(error);
    }
 }