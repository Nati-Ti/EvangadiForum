const router = require('express').Router();

const {askQuestion, getQuestions, getQuestionInfo} = require('./question.controller');

router.post('/', askQuestion);
router.get('/', getQuestions);
router.get('/questionInfo', getQuestionInfo)

module.exports = router;