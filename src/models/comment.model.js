const postsModel = require("./posts.model");
const user_comment_postModel = require("./user_comment_post.model");

module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      comment_id: {
        type: Sequelize.STRING,
        primaryKey:true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull:false
      },
      img_comment_file_path: {
        type: Sequelize.STRING,
        allowNull:true
      },
      date_comment: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
    },
    {
      timestamps: false
    });
    Comments.hasMany(user_comment_postModel);
    user_comment_postModel.belongsTo(commentModel, {
      foreignKey: 'comment_id'
    });
    return Comments;
  };