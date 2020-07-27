const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js"); //datos de nuestra BD

module.exports = db.sequelize.define(
  "unidadesautos",
  {
    id_auto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Num_eco: {
      type: Sequelize.INTEGER,
    },
    año: {
      type: Sequelize.INTEGER,
    },
    ubicacion: {
      type: Sequelize.STRING,
    },
    num_serie: {
      type: Sequelize.STRING,
    },
    marca_auto: {
      type: Sequelize.STRING,
    },
    modelo: {
      type: Sequelize.STRING,
    },
    placas: {
      type: Sequelize.STRING,
    },
    chofer_ruta: {
      type: Sequelize.STRING,
    },
    cilindros_piezas: {
      type: Sequelize.INTEGER,
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);
