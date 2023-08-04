const reactionModel = require("./reaction.model");
const user_comment_postModel = require("./user_comment_post.model");
const usersModel = require("./users.model");

module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull:false
      },
      img_post_file_path: {
        type: Sequelize.STRING,
        allowNull:true
      },
      date_post: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
    },
    {
      timestamps: false
    });
   
    return Posts;
  };