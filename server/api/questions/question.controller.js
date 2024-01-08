const { question } = require('../../config/sequelizeDB');
const { questionPost, getAllQuestions, getQuestionsById, questionInfo, upVote, downVote, deleteQuestion, updateQuestion, getSomeQuestion, numOfQuestions } = require('./question.service');


module.exports = {


  askQuestion: (req, res) => {

    const { title, description, userId } = req.body;
    // const id = req.query.userId;
  
    if (!title || !description || !userId )
      return res.status(400).json({ msg: 'The question title and description fields are necessary!' });
  
    else {
      const questionData = {
        userId: userId,
        title: title,
        description: description,
      };
      questionPost(questionData, (err, questionPostResult) => {
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

  getSomeQuestions: (req, res) => {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    if(!limit && !offset) {
      getAllQuestions((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'Database connection error!'});
        }
        return res.status(200).json({ data: results});
      })
    }
    getSomeQuestion(limit, offset, (err, results)=> {
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
  },

  getMyQuestions: (req, res) => {
    const id = req.query.userId;
    getQuestionsById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'Database connection error!'});
      }
      return res.status(200).json({ data: results});
    })
  },

  setVote: (req, res) => {
    const type = req.query.type;
    const { userId, questionId } = req.body;
  
    if (!userId || !questionId) {
      return res.status(400).json({ msg: 'The userId and questionId fields are necessary!' });
    }else{
      question.findOne({
        where: { question_id: questionId }
      })
      .then((quest) => {
        if ((type === 'up' && quest.upvotes.includes(userId)) || (type === 'down' && quest.downvotes.includes(userId))) {
          const count = quest.upvotes.length - quest.downvotes.length;
          return res.status(200).json({ count });
        }else{
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
            question.findOne({
              where: { question_id: questionId }
            })
            .then((quest) => {
              if (quest.upvotes.length <= quest.downvotes.length) {
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

  questionUpdate: (req, res) => {

    const { title, description, userId, questionId } = req.body;
  
    if (!title || !description || !questionId || !userId )
      return res.status(400).json({ msg: 'The question title and description fields are necessary!' });
  
    else {
      updateQuestion(req.body, (err, updateResult) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: 'Database connection error!'});
        }
        return res.status(200).json({
          msg: 'Question Updated successfully!',
          data: updateResult
        });
      });
    }
  },

  questionDeletion: (req, res) => {
    const quesId = req.query.questionId;
    deleteQuestion(quesId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'Database connection error!'});
      }
      return res.status(200).json({ msg: results});
    })
  },

  totalQuestions: (req, res) => {
    numOfQuestions((err, results) => {
      if (err) {
        console.log(err); 
        return res.status(500).json({ msg: 'Database connection error!' });
      }
      return res.status(200).json({ data: results });
    });
  },
  
}
