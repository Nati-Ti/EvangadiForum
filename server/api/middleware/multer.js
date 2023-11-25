const multer = require("multer");



const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the directory to store the uploaded files
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({ storage });

module.exports = upload;