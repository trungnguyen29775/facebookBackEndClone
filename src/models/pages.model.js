const page_followModel = require("./page_follow.model");

module.exports = (sequelize, Sequelize) => {
  const Pages = sequelize.define("pages", {
    page_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    avt_page_file_path: {
      type: Sequelize.STRING,
      allowNull:false
    },
    
  },
  {
    timestamps: false
  });
  return Pages;
};