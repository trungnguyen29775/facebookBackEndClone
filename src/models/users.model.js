const { DataTypes } = require('sequelize');
const page_followModel = require('./page_follow.model');
const friendship_user_model = require('./friendship_user_model');
const postsModel = require('./posts.model');
const user_comment_postModel = require('./user_comment_post.model');
const accountModel = require('./account.model');
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firs_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull:false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull:false
    },
    avt_file_path: {
      type: Sequelize.STRING,
      allowNull:false
    },
    
  },
  {
    timestamps: false
  });
  Users.hasMany(page_followModel)
  page_followModel.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  Users.hasMany(friendship_user_model)
  friendship_user_model.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  Users.hasMany(postsModel)
  postsModel.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  Users.hasMany(user_comment_postModel)
  user_comment_postModel.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  Users.hasOne(accountModel)
  accountModel.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  return Users;
};