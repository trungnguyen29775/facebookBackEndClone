
module.exports = (sequelize, Sequelize) => {
    const GroupMember = sequelize.define("group_member", {
      group_member_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
    },
    {
      timestamps: false
    });

    return GroupMember;
  };