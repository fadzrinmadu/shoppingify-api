const multer = require('multer');
const path = require('path');

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads/products',
    filename: (request, file, callback) => {
      callback(null, `breed-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
}).single('image');

module.exports = { uploadImage };