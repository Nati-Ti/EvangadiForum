const router = require('express').Router();
const { uploadProfilePic, getProfilePic } = require('./upload.controller');
const upload = require("../middleware/multer");



router.put('/profilePic', upload.single('profilePicture'), uploadProfilePic);
router.get('/profilePic', getProfilePic);



module.exports = router;