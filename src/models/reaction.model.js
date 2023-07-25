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
  Reaction.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  usersModel.hasMany(Reaction)
  Reaction.belongsTo(postsModel, {
    foreignKey: 'post_id'
  });
  postsModel.hasMany(Reaction)
  return Reaction;
};