const cloudinary = require("cloudinary").v2; // methods to connect with cloudinary cloud
const multer = require("multer"); // methods to deal form-data requests
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // methods to connect
//multer with cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_ACCOUNT_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "auto-premium",
    allowedFormats: ["jpg", "png"],
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
