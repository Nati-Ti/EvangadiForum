const router = require('express').Router();

const {askQuestion, getQuestions, getMyQuestions, getQuestionInfo, setVote, questionDeletion, questionUpdate, getSomeQuestions, totalQuestions } = require('./question.controller');

router.post('/', askQuestion);
// router.get('/', getQuestions);
router.get('/', getSomeQuestions);
router.get('/questionInfo', getQuestionInfo);
router.get('/getMyQuestions', getMyQuestions);
router.put('/vote', setVote);
router.put('/update', questionUpdate);
router.delete('/delete', questionDeletion);
router.get('/total', totalQuestions);

module.exports = router;