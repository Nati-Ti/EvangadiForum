
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
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  
const registration = sequelize.define('registration', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'registration',
});

const profile = sequelize.define('profile', {
  user_profile_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: registration,
      key: 'user_id',
    },
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  profile_picture: {
    type: DataTypes.TEXT
  },
  bio: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT
  },
  birth_date: {
    type: DataTypes.DATE
  },
  occupation: {
    type: DataTypes.STRING(255)
  },
  location: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'profile',
});
  
const question = sequelize.define('question', {
  question_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question_title: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  question_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  upvotes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  downvotes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  question_code_base: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.STRING(255),
  },
  post_id: {
    type: DataTypes.STRING(255),
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: registration,
      key: 'user_id',
    },
  },
}, {
  tableName: 'question',
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
  upvotes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  downvotes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  answer_code_base: {
    type: DataTypes.TEXT,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: registration,
      key: 'user_id',
    },
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: question,
      key: 'question_id',
    },
  },
}, {
  tableName: 'answer',
});

const bookmark = sequelize.define('bookmark', {
  bookmark_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: registration,
      key: 'user_id',
    },
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: question,
      key: 'question_id',
    },
  },
},{
  tableName: 'bookmark',
});
  
  
  // explicitly configuring associations using Sequelize's association methods allows for more flexibility and control over how associations are handled.
  profile.belongsTo(registration, { foreignKey: 'user_id' });
  registration.hasOne(profile, { foreignKey: 'user_id' });
  
  question.belongsTo(registration, { foreignKey: 'user_id' });
  registration.hasMany(question, { foreignKey: 'user_id' });

  answer.belongsTo(registration, { foreignKey: 'user_id' });
  registration.hasMany(answer, { foreignKey: 'user_id' });

  answer.belongsTo(question, { foreignKey: 'question_id' });
  question.hasMany(answer, { foreignKey: 'question_id' });

  profile.belongsToMany(question, { through: 'bookmark', foreignKey: 'user_id' });
  question.belongsTo(profile, { through: 'bookmark', 
  foreignKey: 'question_id' });

  // question.belongsTo(profile, {foreignKey: 'user_id'});
  // profile.hasMany(question, {foreignKey: 'user_id'});

  // Sync the models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database and tables synced!');
  }).catch(err => {
  console.error('Error syncing database:', err);
});


module.exports = {
  sequelize,
  registration,
  profile,
  question,
  answer,
  bookmark
};

