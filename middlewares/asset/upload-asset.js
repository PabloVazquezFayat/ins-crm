const streamifier = require('streamifier');
const cloudinary = require('cloudinary');
const config = require('./config');
const multer = require('multer');
const storage = multer.memoryStorage();
const cacheFile = multer({ storage: storage});

cloudinary.config(config);

const saveToCloud = (req, res, next)=> {

    const uploadStream = cloudinary.v2.uploader.upload_stream(
        {resource_type: "auto", public_id: `ins-crm/${req.file.originalname.split('.')[0]}`},
        (error, result)=> {
            if(error){
                req.file = error;
                return next();
            }else{
                 req.file = result;
                return next();
            }
        }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

}

module.exports = { cacheFile, saveToCloud };