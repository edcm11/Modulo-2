const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dpew8xqza',
  api_key: '839522483739879',
  api_secret: '867oKI3trl718lj7MUjrDgeTUaA' 
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'butterfly', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;