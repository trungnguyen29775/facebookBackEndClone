const { DataTypes } = require('sequelize');
const pagesModel = require('./Pages.model');
const usersModel = require('./users.model');
module.exports = (sequelize, Sequelize) => {
  const PageFollow = sequelize.define("page_follow", {
    page_follow_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    
  },
  {
    timestamps: false
  });
 
  return PageFollow;
};