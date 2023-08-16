
module.exports = (sequelize, Sequelize) => {
    const GroupMess = sequelize.define("group_mess", {
      group_mess_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      img_group_mess_file_path: {
        type: Sequelize.STRING,
        allowNull:true
      },
      date_create: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
    },
    {
      timestamps: false
    });

    return GroupMess;
  };