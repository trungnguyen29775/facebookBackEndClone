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
  
  return UserCommentPost;
};