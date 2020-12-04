const streamifier = require('streamifier');
const cloudinary = require('cloudinary');
const config = require('./config');
const multer = require('multer');
const storage = multer.memoryStorage();
const cacheFile = multer({ storage: storage});

cloudinary.config(config);

const saveToCloud = (req, res, next)=> {

    console.log(req.file);
    
    const uploadStream = cloudinary.v2.uploader.upload_stream(
        {resource_type: "auto", public_id: `ins-crm/${req.file.originalname}`},
        (error, result)=> {
            console.log(result, error);
            if(!error){
                req.file = result;
                next();
                return;
            }
        }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

}

module.exports = { cacheFile, saveToCloud};