
const pool = require('../../config/database')

const { questionPost, getAllQuestions, questionInfo } = require('./question.service');

module.exports = {
  askQuestion: (req, res) => {

    const { title, description, userId } = req.body;
  
    if (!title || !description || !userId )
      return res.status(400).json({ msg: 'The question title and description fields are necessary!' });
  
    else {
      questionPost(req.body, (err, questionPostResult) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: 'Database connection error!'});
        }
        return res.status(200).json({
          msg: 'Question posted successfully!',
          data: questionPostResult
        });
      });
    }
  },

  getQuestions: (req, res) => {
    getAllQuestions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'Database connection error!'});
      }
      return res.status(200).json({ data: results});
    })
  },

  getQuestionInfo: (req, res) => {
    const id = req.query.questionId;

    questionInfo(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'Database connection error!'});
      }
      return res.status(200).json({ data: results});
    })
  }
}
