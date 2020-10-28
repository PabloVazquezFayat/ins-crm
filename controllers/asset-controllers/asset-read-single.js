const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=> {
    try{

        const asset = await Asset.findOne({_id: req.params.id})

        if(asset){
            res.status(200).json(asset);
        }else{
            res.status(404).json({message: `Asset not found`});
        }

    }catch(error){
        next(error);
    }
 }