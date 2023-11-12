const pool = require('../../config/database');

module.exports = {

  register: (data, callback) => {
    pool.query(`INSERT INTO registration (user_name, user_email, user_password) VALUES(?,?,?)`, [
      data.userName,
      data.email,
      data.password
    ], 
    (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  profile: (data, callback) => {
    pool.query(`INSERT INTO profile (user_id, first_name, last_name) VALUES(?,?,?)`,[
      data.userId,
      data.firstName,
      data.lastName
    ], (err, results) =>{
      if(err) return callback(err);
      return callback(null, results);
    });
  }, 

  userById: (id, callback) => {
    pool.query(`SELECT registration.user_id, user_name, user_email, first_name, last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
    [id],
    (err, results) => {
      if(err) return callback(err);
      return callback(null, results[0]);
    });
  },

  getUserByEmail: (email, callback) =>{
    pool.query(`SELECT * FROM registration WHERE user_email = ?`,
    [email],
    (err, results) => {
      if(err) return callback(err);
      return callback(null, results[0]);
    });
  },

  getAllUsers: (callback) => {
    pool.query(`SELECT * FROM registration`,
    (err, results) => {
      if(err) return callback(err);
      return callback(null, results);
    });
  }


}