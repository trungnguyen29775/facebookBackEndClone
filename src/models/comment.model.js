
module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      comment_id: {
        type: Sequelize.INTEGER,
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

    return Comments;
  };