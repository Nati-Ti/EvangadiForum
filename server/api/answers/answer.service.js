// const pool = require('../../config/database');
const { answer, registration } = require('../../config/sequelizeDB');



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
  
  getAnswersById: (questionId, callback) => {
    answer.findAll({
      where: { question_id: questionId },
      include: { model: registration, required: false }
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