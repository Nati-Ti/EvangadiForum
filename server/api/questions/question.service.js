const pool = require('../../config/database');

module.exports = {

  questionPost: (data, callback) => {
    pool.query(`INSERT INTO question (user_id, question_title, question_description) VALUES(?,?,?)`, [
      data.userId,
      data.title,
      data.description
    ], 
    (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  getAllQuestions: (callback) => {
    pool.query(`SELECT question.*, registration.user_name, registration.user_id FROM question LEFT JOIN registration ON question.user_id = registration.user_id`,
    (err, results) => {
      if(err) return callback(err);
      return callback(null, results);
    });
  },

  questionInfo: (id, callback) => {
    pool.query(`SELECT * FROM question WHERE question.question_id = ?`,
    [id],
    (err, results) => {
      if(err) return callback(err);
      return callback(null, results[0]);
    });
  }



}