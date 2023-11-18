const { answer } = require('../../config/sequelizeDB');
const {answerPost, getAnswersById, upVote, downVote, numOfAns} = require('./answer.service');

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
  },

  getNumOfAnswersById: (req, res) => {
    const questionId = req.query.questionId;

    numOfAns(questionId, (err, results) => {
      if (err) {
        console.log(err); 
        return res.status(500).json({ msg: 'Database connection error!' });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },

  setVote: (req, res) => {
    const type = req.query.type;
    const { userId, answerId } = req.body;
  
    if (!userId || !answerId) {
      return res.status(400).json({ msg: 'The userId and answerId fields are necessary!' });
    }else{
      answer.findOne({
        where: { answer_id: answerId }
      })
      .then((ans) => {
        if ((type === 'up' && ans.upvotes.includes(userId)) || (type === 'down' && ans.downvotes.includes(userId))) {
          const count = ans.upvotes.length - ans.downvotes.length;
          return res.status(200).json({ count });
        } else{
          if (type === 'up') {
            upVote(req.body, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Database connection error!' });
              }
              const count = (results && results.upvotes && results.downvotes)
                ? results.upvotes.length - results.downvotes.length
                : 0;
              return res.status(200).json({ count });
            });
          }
        
          if (type === 'down') {
            answer.findOne({
              where: { answer_id: answerId }
            })
            .then((ans) => {
              if (ans.upvotes.length <= ans.downvotes.length) {
                return res.status(200).json({ count: 0 });
              } else {
                downVote(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: 'Database connection error!' });
                  }
                  const count = (results && results.upvotes && results.downvotes)
                    ? results.upvotes.length - results.downvotes.length
                    : 0;
                  return res.status(200).json({ count });
                });
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ msg: 'Database connection error!' });
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Database connection error!' });
      });
    }
  },


}