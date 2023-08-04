const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Friendship = sequelize.define("friendship", {
    friendship_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    friend_user_name:{
      type: Sequelize.STRING,
      allowNull:false
    },
    status:{
      type:Sequelize.STRING,
      allowNull:false
    },
    add_friend_date: {
      type: Sequelize.DATEONLY,
      allowNull:false
    },
    
  },
  {
    timestamps: false
  });
  
  return Friendship;
};