const { DataTypes } = require('sequelize');
const friendship_user_model = require('./friendship_user_model');
module.exports = (sequelize, Sequelize) => {
  const FriendShip = sequelize.define("friendship", {
    friendship_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    add_friend_date: {
      type: Sequelize.DATEONLY,
      allowNull:false
    },
    
  },
  {
    timestamps: false
  });
  FriendShip.hasMany(friendship_user_model)
  friendship_user_model.belongsTo(friend_shipModel, {
    foreignKey: 'friendship_id'
  });
  return FriendShip;
};