const cloudinary = require('cloudinary');
const Asset = require('../../models/Asset');
const config = require('./config');

module.exports = (req, res, req)=> {

    cloudinary.config(config);

    try{

        const asset = await Asset.findOne({_id: req.body.data.id});

        if(asset){
            cloudinary.v2.uploader.destroy(asset.name, {resource_type: "auto", invalidate: true}, (error, result)=>{
                if(error){
                    res.status(500).json({error: error})
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