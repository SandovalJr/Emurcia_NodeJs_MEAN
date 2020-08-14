const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js"); //datos de nuestra BD

module.exports = db.sequelize.define("reportes_ventas", {
  id_RV: {
    type: Sequelize.DOUBLE,
    primaryKey: true,
    autoIncrement: true,
  },
  marca: {
    type: Sequelize.STRING,
  },
  region: {
    type: Sequelize.STRING,
  },
  auto: {
    type: Sequelize.STRING,
  },
  Cilidros_Vacios: {
    type: Sequelize.DOUBLE,
  },
  Venta_Kilos: {
    type: Sequelize.DOUBLE,
  },
  Precio_Prom: {
    type: Sequelize.DOUBLE,
  },
  Importe_Liquidar: {
    type: Sequelize.DOUBLE,
  },
  Recibe_caja_efectivo: {
    type: Sequelize.DOUBLE,
  },
  credito_cilindro: {
    type: Sequelize.DOUBLE,
  },
  Importe_credito: {
    type: Sequelize.DOUBLE,
  },
  Cel_Tel_Cliente: {
    type: Sequelize.STRING,
  },
  Litros_Consumo: {
    type: Sequelize.DOUBLE,
  },
  INV_CIL: {
    type: Sequelize.DOUBLE,
  },
  Equiv_KG: {
    type: Sequelize.DOUBLE,
  },
  Comentarios: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
  },
});
