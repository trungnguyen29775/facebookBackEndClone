const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    user_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull:false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull:false
    },
    avt_file_path: {
      type: Sequelize.STRING,
      allowNull:false
    },
    
  },
  {
    timestamps: false
  });
  return Users;
};