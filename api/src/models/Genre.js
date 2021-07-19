const { DataTypes } = require("sequelize");

//used only one time, keeped here for instructor

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Genre", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    tableName: 'Genres'
  });
};
