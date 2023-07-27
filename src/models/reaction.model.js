const { DataTypes } = require('sequelize');
const postsModel = require('./posts.model');
const usersModel = require('./users.model');

module.exports = (sequelize, Sequelize) => {
  const Reaction = sequelize.define("reaction", {
    reaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    react_type: {
      type: Sequelize.ENUM('like', 'love', 'wow', 'haha', 'sad', 'angry','shareLove'),
      allowNull:false
    },
  },
  {
    timestamps: false
  });
  
  return Reaction;
};