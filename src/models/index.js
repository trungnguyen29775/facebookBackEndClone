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
db.Friendship = require("./friendship.model")(sequelize, Sequelize)
db.PageFollow = require("./page_follow.model")(sequelize, Sequelize)
db.Pages = require("./Pages.model")(sequelize, Sequelize)
db.Post = require("./posts.model")(sequelize, Sequelize)
db.Reaction = require("./reaction.model")(sequelize, Sequelize)
db.UserCommentPost = require("./user_comment_post.model")(sequelize, Sequelize)


// -------------------------Relation------------------------

// Comment Relation
db.UserCommentPost.belongsTo(db.Comment, {
  foreignKey: 'comment_id'
});
db.Comment.hasMany(db.UserCommentPost,{
  foreignKey: 'comment_id'
});


// FriendShip Relation
db.Users.hasMany(db.Friendship, {
  foreignKey: 'user_name'
})
db.Friendship.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });

// Page Relation
 db.PageFollow.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });
  db.Users.hasMany(db.PageFollow, {
    foreignKey: 'user_name'
  })
  db.PageFollow.belongsTo(db.Pages, {
    foreignKey: 'page_id'
  });
  db.Pages.hasMany(db.PageFollow, {
    foreignKey: 'page_id'
  })

// Post Realation
 db.Post.belongsTo(db.Users, {
        foreignKey: 'user_name'
      });
db.Users.hasMany(db.Post,{
  foreignKey: 'user_name'
})
db.Post.hasMany(db.UserCommentPost, {
  foreignKey: 'post_id'
})
db.UserCommentPost.belongsTo(db.Post, {
      foreignKey: 'post_id'
    });
db.Post.hasMany(db.Reaction, {
  foreignKey: 'post_id'
})
db.Reaction.belongsTo(db.Post, {
      foreignKey: 'post_id'
  });

// Reaction Relation
db.Users.hasMany(db.Reaction, {
  foreignKey: 'user_name'
})
db.Reaction.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });

// Comment User Relation
db.UserCommentPost.belongsTo(db.Users, {
    foreignKey: 'user_name'
  });
db.Users.hasMany(db.UserCommentPost, {
  foreignKey: 'user_name'
})
module.exports = db;