const router = require('express').Router();

const {answerQuestion, getAllAnswersById, setVote, getNumOfAnswersById} = require('./answer.controller');

router.post('/postAnswer', answerQuestion);
router.get('/getAllAnswers', getAllAnswersById);
router.get('/numOfAnswers', getNumOfAnswersById);
router.put('/vote', setVote);


module.exports = router;