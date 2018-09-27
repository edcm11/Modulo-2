const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:"dn3s8lyeh",
  api_key: '839522483739879',
  api_secret: '867oKI3trl718lj7MUjrDgeTUaA'
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'butterfly',
  allowedFormats: ['jpg', 'png', 'gif'],
  filename: (req, file, cb)=> {
    cb(null, file.originalname); 
 }
});

const uploadCloud = multer({storage})

module.exports = uploadCloud;
