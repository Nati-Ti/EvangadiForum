// const sequelize = require('../../config/sequelizeDB');
// const answer = require('../../config/sequelizeDB');
const pool = require('../../config/database');

module.exports = {

  // answerPost: (data) => {
  //   answer.create({
  //     answer: data.answer,
  //     answer_code_base: data.answerCodeBase,
  //     user_id: data.userId
  //   })
  //     .then((createdAnswer) => {
  //       console.log('Answer posted:', createdAnswer);
  //     })
  //     .catch((error) => {
  //       console.error('Error creating answer:', error);
  //     })
  // },

  answerPost: (data, callback) => {
    pool.query(`INSERT INTO answer (user_id, answer, question_id, answer_code_base) VALUES(?,?,?,?)`, [
      data.userId,
      data.answer,
      data.questId,
      data.answerCodeBase
    ], 
    (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  getAnswersById: (questionId, callback) => {
    // console.log('Question ID:', questionId);
    pool.query(
      `SELECT answer.*, registration.user_id, registration.user_name
      FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
      [questionId],
  
      (err, results) => {
        if (err) {
          console.log(err); 
          return callback(err);
        }
        return callback(null, results);
      }
    );
  }
  


}