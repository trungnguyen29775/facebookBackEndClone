const { DataTypes } = require('sequelize');
const commentModel = require('./comment.model');
const postsModel = require('./posts.model');
const usersModel = require('./users.model');
module.exports = (sequelize, Sequelize) => {
  const UserCommentPost = sequelize.define("user_comment_post", {
    user_comment_post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    
  },
  {
    timestamps: false
  });
  UserCommentPost.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  usersModel.hasMany(UserCommentPost)
  UserCommentPost.belongsTo(commentModel, {
    foreignKey: 'comment_id'
  });
  commentModel.hasMany(UserCommentPost)
  UserCommentPost.belongsTo(postsModel, {
    foreignKey: 'post_id'
  });
  postsModel.hasMany(UserCommentPost)
  return UserCommentPost;
};