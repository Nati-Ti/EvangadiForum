const {answerPost, getAnswersById} = require('./answer.service');
// const app = require('../../../server');

module.exports = {

  answerQuestion: (req, res) => {

    const { userId, answer, questId } = req.body;
  
    if (!answer || !userId || !questId )
      return res.status(400).json({ msg: 'The answer and userId fields are necessary!' });
  
    else {
      answerPost(req.body, (err, answerPostResult) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: 'Database connection error!'});
        }
        return res.status(200).json({
          msg: 'Answer posted successfully!',
          data: answerPostResult
        });
      });
    }
  },

  getAllAnswersById: (req, res) => {
    const questionId = req.query.questionId;
      // console.log(questionId);

    getAnswersById(questionId, (err, results) => {
      if (err) {
        console.log(err); 
        return res.status(500).json({ msg: 'Database connection error!' });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
    
    
  }


}