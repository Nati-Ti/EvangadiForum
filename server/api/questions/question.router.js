const router = require('express').Router();

const {askQuestion, getQuestions, getMyQuestions, getQuestionInfo, setUpVote, setDownVote} = require('./question.controller');

router.post('/', askQuestion);
router.get('/', getQuestions);
router.get('/questionInfo', getQuestionInfo);
router.get('/getMyQuestions', getMyQuestions);
router.put('/upVote', setUpVote);
router.put('/downVote', setDownVote);

module.exports = router;