const dbConfig = require("../config/db.config")
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Users = require("./users.model")(sequelize, Sequelize)
db.Account = require("./account.model")(sequelize, Sequelize)
db.Comment = require("./comment.model")(sequelize, Sequelize)
db.FriendShip = require("./friend_ship.model")(sequelize, Sequelize)
db.FriendShipUser = require("./friendship_user_model")(sequelize, Sequelize)
db.PageFollow = require("./page_follow.model")(sequelize, Sequelize)
db.Pages = require("./Pages.model")(sequelize, Sequelize)
db.Post = require("./posts.model")(sequelize, Sequelize)
db.Reaction = require("./reaction.model")(sequelize, Sequelize)
db.UserCommentPost = require("./user_comment_post.model")(sequelize, Sequelize)

module.exports = db;