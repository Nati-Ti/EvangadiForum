const router = require('express').Router();

const {askQuestion, getQuestions} = require('./question.controller');

router.post('/', askQuestion);
router.get('/', getQuestions);

module.exports = router;