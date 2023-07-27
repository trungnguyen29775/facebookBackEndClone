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
db.Comment = require("./comment.model")(sequelize, Sequelize)
db.FriendShip = require("./friend_ship.model")(sequelize, Sequelize)
db.FriendShipUser = require("./friendship_user_model")(sequelize, Sequelize)
db.PageFollow = require("./page_follow.model")(sequelize, Sequelize)
db.Pages = require("./Pages.model")(sequelize, Sequelize)
db.Post = require("./posts.model")(sequelize, Sequelize)
db.Reaction = require("./reaction.model")(sequelize, Sequelize)
db.UserCommentPost = require("./user_comment_post.model")(sequelize, Sequelize)


// -------------------------Relation------------------------

// Comment Relation
db.Comment.hasMany(db.UserCommentPost);
db.UserCommentPost.belongsTo(db.Comment, {
      foreignKey: 'comment_id'
    });

// FriendShip Relation
db.FriendShip.hasMany(db.FriendShipUser)
db.FriendShipUser.belongsTo(db.FriendShip, {
    foreignKey: 'friendship_id'
  });

// Page Relation
 db.PageFollow.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });
  db.Users.hasMany(db.PageFollow)
  db.PageFollow.belongsTo(db.Pages, {
    foreignKey: 'page_id'
  });
  db.Pages.hasMany(db.PageFollow)

// Post Realation
 db.Post.belongsTo(db.Users, {
        foreignKey: 'user_name'
      });
db.Users.hasMany(db.Post)
db.Post.hasMany(db.UserCommentPost)
db.UserCommentPost.belongsTo(db.Post, {
      foreignKey: 'post_id'
    });
db.Post.hasMany(db.Reaction)
db.Reaction.belongsTo(db.Post, {
      foreignKey: 'post_id'
  });

// Reaction Relation
db.Reaction.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });
db.Users.hasMany(db.Reaction)
// Comment User Relation
db.UserCommentPost.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });
db.Users.hasMany(db.UserCommentPost)
module.exports = db;