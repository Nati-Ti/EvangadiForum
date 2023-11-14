const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.MYSQL_DB,
	password: process.env.DB_PASS,
	waitForConnections: true,
	connectionLimit: 10
});
pool.getConnection(function(err, conn) {
	console.log("Database connected!");
});

let registration = 
`CREATE TABLE if not exists registration(
  user_id int auto_increment,
  user_name varchar(255) not null,
  user_email varchar(255) not null,
  user_password varchar(255) not null,
  PRIMARY KEY (user_id)
)`;

let profile = 
`CREATE TABLE if not exists profile(
  user_profile_id int auto_increment,
  user_id int not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,        
  PRIMARY KEY (user_profile_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let question = 
`CREATE TABLE if not exists question(
  question_id int auto_increment,
  question_title varchar(1000) not null,
  question_description TEXT not null,
  question_code_base varchar(1500),     
  tags varchar(255),
  post_id varchar(255),
  user_id int not null,   
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let answer = 
`CREATE TABLE if not exists answer(
  answer_id int auto_increment,
  answer TEXT not null,
  answer_code_base varchar(1500),
  user_id int not null,
  question_id int not null,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id),
  FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;

pool.query(registration, (err, res) => {
  if(err) throw err;
  console.log('Registration table created');
})

pool.query(profile, (err, res) => {
  if(err) throw err;
  console.log('Profile table created');
})

pool.query(question, (err, res) => {
  if(err) throw err;
  console.log('Question table created');
})

pool.query(answer, (err, res) => {
  if(err) throw err;
  console.log('Answer table created');
})

module.exports = pool;