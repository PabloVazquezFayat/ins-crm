const Asset = require('../../models/Asset');

module.exports = async (req, res, next)=> {
    try{

        const assets = await Asset.find({account: req.params.account_id});

        if(assets){
            res.status(200).json(assets);
        }else{
            res.status(404).json({message: `No assets found`});
        }

    }catch(error){
        next(error);
    }
 }