const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, getUsers, getUserById, login, getProfileInfo } = require('./user.controller');

router.post('/register', createUser);
router.get('/all', getUsers);
router.get('/', auth, getUserById);
router.post('/login', login);
router.get('/profileInfo', getProfileInfo);

module.exports = router;