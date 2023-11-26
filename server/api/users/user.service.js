// const pool = require('../../config/database');
const { registration, profile } = require('../../config/sequelizeDB');


module.exports = {

  register: (data, callback) => {
    registration.create({
      user_name: data.userName,
      user_email: data.email,
      user_password: data.password
    })
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
  },

  profile: (data, callback) => {
    profile.create({
      user_id: data.userId,
      first_name: data.firstName,
      last_name: data.lastName
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },

  userById: (id, callback) => {
    registration.findOne({
      where: { user_id: id },
      include: { model: profile, required: false }
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },
  
  getUserByEmail: (email, callback) => {
    registration.findOne({
        where: { user_email: email }
    })
    .then(result => {
        callback(null, result);
    })
    .catch(err => {
        callback(err);
    });
  },

  getAllUsers: (callback) => {
    registration.findAll()
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  },

  profileInfoById: (id, callback) => {
    profile.findOne({
      where: { user_id: id }
    })
      .then(results => {
        callback(null, results);
      })
      .catch(err => {
        callback(err);
      });
  }, 

  updateProfile:(data, callback) => {
    profile.findOne({
      where: {user_id: data.id}
    }).then( async (prof) => {
      prof.bio = data.bio,
      prof.url = data.url,
      prof.occupation = data.occupation,
      prof.location = data.location,
      prof.birth_date = data.birthday
      await prof.save();
    })
    .then(results => {
      callback(null, results);
    })
    .catch(err => {
      callback(err);
    });
  }



  // // using raw sql query below

  // register: (data, callback) => {
  //   pool.query(`INSERT INTO registration (user_name, user_email, user_password) VALUES(?,?,?)`, [
  //     data.userName,
  //     data.email,
  //     data.password
  //   ], 
  //   (err, results) => {
  //     if (err) return callback(err);
  //     return callback(null, results);
  //   });
  // },

  // profile: (data, callback) => {
  //   pool.query(`INSERT INTO profile (user_id, first_name, last_name) VALUES(?,?,?)`,[
  //     data.userId,
  //     data.firstName,
  //     data.lastName
  //   ], (err, results) =>{
  //     if(err) return callback(err);
  //     return callback(null, results);
  //   });
  // }, 

  // userById: (id, callback) => {
  //   pool.query(`SELECT registration.user_id, user_name, user_email, first_name, last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
  //   [id],
  //   (err, results) => {
  //     if(err) return callback(err);
  //     return callback(null, results[0]);
  //   });
  // },

  // getUserByEmail: (email, callback) =>{
  //   pool.query(`SELECT * FROM registration WHERE user_email = ?`,
  //   [email],
  //   (err, results) => {
  //     if(err) return callback(err);
  //     return callback(null, results[0]);
  //   });
  // },

  // getAllUsers: (callback) => {
  //   pool.query(`SELECT * FROM registration`,
  //   (err, results) => {
  //     if(err) return callback(err);
  //     return callback(null, results);
  //   });
  // }


}