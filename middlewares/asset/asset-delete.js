const cloudinary = require('cloudinary');
const Asset = require('../../models/Asset');
const config = require('./config');

module.exports = async (req, res, next)=> {

    cloudinary.config(config);

    try{

        const asset = await Asset.findOne({_id: req.body.data.asset_id});

        if(asset){
            cloudinary.v2.uploader.destroy(asset.cloudData.public_id, 
                {resource_type: asset.cloudData.resource_type, invalidate: true}, 
                (error, result)=>{
                    if(error){
                        res.status(500).json({error: error});
                    }else{
                        req.body.asset = result;
                        next();
                    }
                });
        }

    }catch(error){
        next();
    }

}