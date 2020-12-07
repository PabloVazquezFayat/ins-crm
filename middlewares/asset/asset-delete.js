const cloudinary = require('cloudinary');
const config = require('./config');

module.exports = (req, res, req)=> {

    cloudinary.config(config);

    cloudinary.v2.uploader.destroy(req.body.public_id, {resource_type: "auto", invalidate: true}, (error, result)=>{
        if(error){
            req.body.asset = error;
            next();
        }else{
            req.body.asset = result;
            next();
        }
    });

}