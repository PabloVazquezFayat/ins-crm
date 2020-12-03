const cloudinary = require('cloudinary');
const config = require('./config');

cloudinary.config(config);

module.exports = (req, res, req)=> {

    cloudinary.v2.uploader.destroy(req.body.public_id, {resource_type: "image", invalidate: true}, (error, result)=>{
        if(error){
            req.body.asset = error;
            next();
        }else{
            req.body.asset = result;
            next();
        }
    });

}