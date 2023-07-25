const { DataTypes } = require('sequelize');
const usersModel = require('./users.model');
module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false
    },
  },
  {
    timestamps: false
  });
  Accounts.belongsTo(usersModel, {
    foreignKey: 'user_id'
  });
  usersModel.hasMany(Accounts)
  return Accounts;
};
