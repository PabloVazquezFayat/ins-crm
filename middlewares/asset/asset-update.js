const cloudinary = require('cloudinary');
const config = require('./config');
const Asset = require('../../models/Asset');

cloudinary.config(config);

module.exports = (req, res, next)=> {

    try{

        const asset = await Asset.findOne({_id: req.body.data.asset_id});

        if(asset){
            cloudinary.v2.uploader.rename( asset.name, req.body.data.newName,
                (error, result)=> {
                    if(error){
                        return res.status(500).json({errors: error});
                    }else{
                        req.asset = result;
                        return next();
                    }
                }
            );
        }

    }catch(error){
        next();
    }

}