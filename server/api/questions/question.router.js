const router = require('express').Router();

const {askQuestion, getQuestions, getMyQuestions, getQuestionInfo, setVote } = require('./question.controller');

router.post('/', askQuestion);
router.get('/', getQuestions);
router.get('/questionInfo', getQuestionInfo);
router.get('/getMyQuestions', getMyQuestions);
router.put('/vote', setVote);

module.exports = router;