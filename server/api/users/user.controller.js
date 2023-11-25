const {register, profile, userById, getAllUsers, getUserByEmail, profileInfoById} = require('./user.service');

// const pool = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

  createUser: (req, res) => {

    const { userName, firstName, lastName, email, password } = req.body;
  
    if (!userName || !firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: 'Not all fields have been provided!' });
    if (password.length < 8)
      return res.status(400).json({ msg: 'Password must be at least 8 characters!' });
  
    // Check if an account with the email already exists
    getUserByEmail(email, (err, results) => {
      if (err) {
          return res.status(400).json({ msg: 'Database c error!' });
      }
      if (results) {
          return res.status(400).json({ msg: 'An account with this email already exists!' });
      } else {
        // Changing the value of password from req.body with the encrypted password
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(password, salt);
    
        register(req.body, (err, registerResults) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ msg: 'Database c2 error!' });
          }
          // req.body.userId = results[0].user_id;
          // Adding user_id to req.body
          req.body.userId = registerResults.user_id; // Assuming registerResults contains the inserted user ID
    
          // Insert data into the profile table
          profile(req.body, (err, profileResults) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: 'Database connection error!' });
            }
            return res.status(200).json({
              msg: 'New user added successfully',
              data: profileResults
            });
          });
        });
      }
    });
  },

  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'Database connection error!'});
      }
      return res.status(200).json({ data: results});
    })
  },

  getUserById: (req, res) => {
    userById(req.id, (err, results) => {
        if (err) {
            console.log(err);
            return res
                .status(500)
                .json({ msg: "database connection err" })
        }
        if (!results) {
            return res.status(404).json({ msg: "Record not found" });
        }
        return res.status(200).json({ data: results })
    })
  },

  login: (req, res) => {

      const { email, password } = req.body;
      
      //validation
      if (!email || !password)
          return res
              .status(400)
              .json({ msg: 'Not all fields have been provided!' })
      
      //sending data to check if email exist on our database
      getUserByEmail(email, (err, results) => {
          if (err) {
              console.log(err);
              res.status(500).json({ msg: "database connection err" })
          }
          if (!results) {
              return res
                  .status(404)
                  .json({ msg: "No account with this email has been registered" })
          }

          //check provided password by the user with the encrypted password from database
          const isMatch = bcrypt.compareSync(password, results.user_password);
          if (!isMatch)
              return res
                  .status(404)
                  .json({ msg: "Invalid Credentials" })
          
          //creating token for the signed user that expires in 1 hour and using our secret key for creation
          const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });

          //returning token and user-info
          return res.json({
              token,
              user: {
                  id: results.user_id,
                  display_name: results.user_name
              }
          })
      })
  },

  getProfileInfo: (req, res) => {
    const id = req.query.userId;
    profileInfoById(id, (err, results) => {
        if (err) {
            console.log(err);
            return res
                .status(500)
                .json({ msg: "database connection err" })
        }
        if (!results) {
            return res.status(404).json({ msg: "Record not found" });
        }
        return res.status(200).json({ data: results })
    })
  },

}