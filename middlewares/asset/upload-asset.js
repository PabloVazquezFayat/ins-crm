const cloudinary = require('cloudinary');
const config = require('./config');

cloudinary.config(config);

let storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'lead',
	allowedFormats: ['jpg', 'png', 'pdf'],
	filename: function (req, file, cb){
		cb(null, file.originalname.split('.')[0]);
	}
});

const parser = multer({ storage: storage });

module.exports = parser