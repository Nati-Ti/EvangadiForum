// const pool = require('../../config/database');
const { registration, question, profile } = require('../../config/sequelizeDB');
const { sequelize } = require('../../config/sequelizeDB');



module.exports = {


  questionPost: (data, callback) => {
    question.create({
      user_id: data.userId,
      question_title: data.title,
      question_description: data.description
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },
  
  getAllQuestions: (callback) => {
    question.findAll({
      include: [
        { 
          model: registration,
          attributes: ['user_id', 'user_name'],
          required: false
        },
        {
          model: profile,
          attributes: ['user_profile_id', 'profile_picture'],
          required: false,
          where: { user_id: sequelize.col('question.user_id') }
        }
      ],
      order: [['createdAt', 'DESC']]
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },

  getQuestionsById: (id, callback) => {
    question.findAll({
      where: { user_id: id },
      order: [['createdAt', 'DESC']]
    })
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
  },
  
  questionInfo: (id, callback) => {
    question.findByPk(id)
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },

  upVote: (data, callback) => {
    const id = data.userId;
    question.findOne({
      where: { question_id: data.questionId }
    })
    .then((questionInstance) => {

      if (questionInstance) {
        if (questionInstance.downvotes.includes(id)) {
          const newDownvotes = questionInstance.downvotes.filter(downvoteId => downvoteId !== id);
          questionInstance.update({
            downvotes: newDownvotes
          })
          .then(updatedQuestion => {
            
            const newUpvotes = updatedQuestion.upvotes.concat([id]);
            updatedQuestion.update({
              upvotes: newUpvotes
            })
            .then(finalUpdatedQuestion => {
              callback(null, finalUpdatedQuestion);
            })
            .catch(err => {
              callback(err);
            });
          })
          .catch(err => {
            callback(err);
          });

        } else {
          
          const newUpvotes = questionInstance.upvotes.concat([id]);
          questionInstance.update({
            upvotes: newUpvotes
          })
          .then(updatedQuestion => {
            callback(null, updatedQuestion);
          })
          .catch(err => {
            callback(err);
          });
        }
      } else {
        callback({ error: 'Question not found' });
      }
    })
    .catch(err => {
      callback(err);
    });
  },

  downVote: (data, callback) => {
    const id = data.userId;
    question.findOne({
      where: { question_id: data.questionId }
    })
    .then((questionInstance) => {

      if (questionInstance) {
        if (questionInstance.upvotes.includes(id)) {
          const newUpvotes = questionInstance.upvotes.filter(upvoteId => upvoteId !== id);
          questionInstance.update({
            upvotes: newUpvotes
          })
          .then(updatedQuestion => {
            
            const newDownvotes = updatedQuestion.downvotes.concat([id]);
            updatedQuestion.update({
              downvotes: newDownvotes
            })
            .then(finalUpdatedQuestion => {
              callback(null, finalUpdatedQuestion);
            })
            .catch(err => {
              callback(err);
            });
          })
          .catch(err => {
            callback(err);
          });

        } else {
          
          const newDownvotes = questionInstance.downvotes.concat([id]);
          questionInstance.update({
            downvotes: newDownvotes
          })
          .then(updatedQuestion => {
            callback(null, updatedQuestion);
          })
          .catch(err => {
            callback(err);
          });
        }
      } else {
        callback({ error: 'Question not found' });
      }
    })
    .catch(err => {
      callback(err);
    });
  },
  
  updateQuestion: (data, callback) => {
    question.update(
      {
        question_title: data.title,
        question_description: data.description
      },
      {
        where: { question_id: data.questionId, user_id: data.userId }
      }
    )
      .then(result =>
        callback(null,result)
      )
      .catch(err =>
        callback(err)
      );
  },

  deleteQuestion: (quesId, callback) => {
    question.destroy({
      where: {
        question_id: quesId
      }
    })
      .then(results => {
        callback('Question deleted successfully', results);
      })
      .catch((error) => {
        console.log('Error deleting record:', error);
      });
  },







  // // using raw sql query below

  // questionPost: (data, callback) => {
  //   pool.query(`INSERT INTO question (user_id, question_title, question_description) VALUES(?,?,?)`, [
  //     data.userId,
  //     data.title,
  //     data.description
  //   ], 
  //   (err, results) => {
  //     if (err) return callback(err);
  //     return callback(null, results);
  //   });
  // },

  // getAllQuestions: (callback) => {
  //   pool.query(`SELECT question.*, registration.user_name, registration.user_id FROM question LEFT JOIN registration ON question.user_id = registration.user_id`,
  //   (err, results) => {
  //     if(err) return callback(err);
  //     return callback(null, results);
  //   });
  // },

  // questionInfo: (id, callback) => {
  //   pool.query(`SELECT * FROM question WHERE question.question_id = ?`,
  //   [id],
  //   (err, results) => {
  //     if(err) return callback(err);
  //     return callback(null, results[0]);
  //   });
  // }



}