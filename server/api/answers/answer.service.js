// const pool = require('../../config/database');
const { answer, registration, question } = require('../../config/sequelizeDB');



module.exports = {


  answerPost: (data, callback) => {
    answer.create({
      user_id: data.userId,
      answer: data.answer,
      question_id: data.questId,
      answer_code_base: data.answerCodeBase
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },

  getAnswerById: (answerId, callback) => {
    answer.findOne({
      where: { answer_id: answerId },
      include: [
        { 
          model: registration,
          attributes: ['user_id', 'user_name'],
          required: false
        },
        { 
          model: question,
          attributes: ['question_id', 'question_title', 'question_description', 'upvotes', 'downvotes'],
          required: false
        }
      ]
      })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },
  
  getAnswersById: (questionId, callback) => {
    answer.findAll({
      where: { question_id: questionId },
      include: { model: registration, required: false },
      order: [['upvotes', 'DESC']]
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },

  upVote: (data, callback) => {
    const id = data.userId;
    answer.findOne({
      where: { answer_id: data.answerId }
    })
    .then((answerInstance) => {

      if (answerInstance) {
        if (answerInstance.downvotes.includes(id)) {
          const newDownvotes = answerInstance.downvotes.filter(downvoteId => downvoteId !== id);
          answerInstance.update({
            downvotes: newDownvotes
          })
          .then(updatedAnswer => {
            
            const newUpvotes = updatedAnswer.upvotes.concat([id]);
            updatedAnswer.update({
              upvotes: newUpvotes
            })
            .then(finalUpdatedAnswer => {
              callback(null, finalUpdatedAnswer);
            })
            .catch(err => {
              callback(err);
            });
          })
          .catch(err => {
            callback(err);
          });

        } else {
          
          const newUpvotes = answerInstance.upvotes.concat([id]);
          answerInstance.update({
            upvotes: newUpvotes
          })
          .then(updatedAnswer => {
            callback(null, updatedAnswer);
          })
          .catch(err => {
            callback(err);
          });
        }
      } else {
        callback({ error: 'Answer not found' });
      }
    })
    .catch(err => {
      callback(err);
    });
  },

  downVote: (data, callback) => {
    const id = data.userId;
    answer.findOne({
      where: { answer_id: data.answerId }
    })
    .then((answerInstance) => {

      if (answerInstance) {
        if (answerInstance.upvotes.includes(id)) {
          const newUpvotes = answerInstance.upvotes.filter(upvoteId => upvoteId !== id);
          answerInstance.update({
            upvotes: newUpvotes
          })
          .then(updatedAnswer => {
            
            const newDownvotes = updatedAnswer.downvotes.concat([id]);
            updatedAnswer.update({
              downvotes: newDownvotes
            })
            .then(finalUpdatedAnswer => {
              callback(null, finalUpdatedAnswer);
            })
            .catch(err => {
              callback(err);
            });
          })
          .catch(err => {
            callback(err);
          });

        } else {
          
          const newDownvotes = answerInstance.downvotes.concat([id]);
          answerInstance.update({
            downvotes: newDownvotes
          })
          .then(updatedAnswer => {
            callback(null, updatedAnswer);
          })
          .catch(err => {
            callback(err);
          });
        }
      } else {
        callback({ error: 'Answer not found' });
      }
    })
    .catch(err => {
      callback(err);
    });
  },

  numOfAns: (id, callback) => {
    answer.count({
      where: { question_id: id }
    })
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
  }












  // // using raw sql query below
  // answerPost: (data, callback) => {
  //   pool.query(`INSERT INTO answer (user_id, answer, question_id, answer_code_base) VALUES(?,?,?,?)`, [
  //     data.userId,
  //     data.answer,
  //     data.questId,
  //     data.answerCodeBase
  //   ], 
  //   (err, results) => {
  //     if (err) return callback(err);
  //     return callback(null, results);
  //   });
  // },

  // getAnswersById: (questionId, callback) => {
  //   pool.query(
  //     `SELECT answer.*, registration.user_id, registration.user_name
  //     FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
  //     [questionId],
  
  //     (err, results) => {
  //       if (err) {
  //         console.log(err); 
  //         return callback(err);
  //       }
  //       return callback(null, results);
  //     }
  //   );
  // }
  


}