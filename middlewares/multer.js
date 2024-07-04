const multer = require("multer");

//for storing files in memory(db) as buffers, use memoryStorage
//for storing files on the local filesystem, use diskStorage
//use diskStorage for storing files on Cloudinary, as it provides a "path"(req.file.path) necessary for uploading images.
const storage = multer.diskStorage({
    destination: './public/uploads/',       //destination req by diskStorage    //memoryStorage ignores destination
    filename: async(req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

//filter to allow only images
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }
    else{
        cb(new Error('Only images are allowed'), false);
    }
};

//multer configuration
const upload = multer({
    storage: storage,
    fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}  // 5 MB
});

module.exports = upload;