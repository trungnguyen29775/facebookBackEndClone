const friend_shipModel = require("./friend_ship.model");
const usersModel = require("./users.model");

module.exports = (sequelize, Sequelize) => {
  const FriendShipUser = sequelize.define("friendship_user", {
    friend_ship_user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    timestamps: false
  });
  return FriendShipUser;
};