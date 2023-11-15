
const { Sequelize, DataTypes  } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


const answer = sequelize.define('answer', {
  answer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer_code_base: {
    type: DataTypes.STRING(1500),
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'registration',
      key: 'user_id',
    },
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'question',
      key: 'question_id',
    },
  },
});

// Create the table if it doesn't exist
answer.sync()
  .then(() => {
    console.log('Answer table synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Alternatively, if you want to drop and recreate the table on each sync:
// Answer.sync({ force: true });

module.exports = sequelize;
module.exports = answer;