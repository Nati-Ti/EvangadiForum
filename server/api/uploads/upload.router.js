const router = require('express').Router();
const { uploadProfilePic, getProfilePic, getProfilePicByFileName } = require('./upload.controller');
const upload = require("../middleware/multer");



router.put('/profilePic', upload.single('profilePicture'), uploadProfilePic);
router.get('/userProfilePic', getProfilePic);
router.get('/profilePic', getProfilePicByFileName);



module.exports = router;