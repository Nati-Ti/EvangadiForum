const router = require('express').Router();

const {answerQuestion, getAllAnswersById} = require('./answer.controller');

router.post('/postAnswer', answerQuestion);
router.get('/getAllAnswers', getAllAnswersById);


module.exports = router;