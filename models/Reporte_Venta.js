const Sequelize = require("sequelize"); //para usar el modelo del user
const db = require("../database/db.js"); //datos de nuestra BD

module.exports = db.sequelize.define("reportes_ventas", {
  id_RV: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.INTEGER,
  },
  Venta_Kilos: {
    type: Sequelize.INTEGER,
  },
  Precio_Prom: {
    type: Sequelize.INTEGER,
  },
  Importe_Liquidar: {
    type: Sequelize.INTEGER,
  },
  Recibe_caja_efectivo: {
    type: Sequelize.INTEGER,
  },
  credito_cilindro: {
    type: Sequelize.INTEGER,
  },
  Importe_credito: {
    type: Sequelize.INTEGER,
  },
  Cel_Tel_Cliente: {
    type: Sequelize.STRING,
  },
  Litros_Consumo: {
    type: Sequelize.INTEGER,
  },
  INV_CIL: {
    type: Sequelize.INTEGER,
  },
  Equiv_KG: {
    type: Sequelize.INTEGER,
  },
  T_INV_CIL: {
    type: Sequelize.INTEGER,
  },
  T_Equiv_KG: {
    type: Sequelize.INTEGER,
  },
  Total_KilosV: {
    type: Sequelize.INTEGER,
  },
  Total_CilindrosV: {
    type: Sequelize.INTEGER,
  },
  Total_caja_efectivo: {
    type: Sequelize.INTEGER,
  },
  T_credito_cilindro: {
    type: Sequelize.INTEGER,
  },
  T_Importe_credito: {
    type: Sequelize.INTEGER,
  },
  Comentarios: {
    type: Sequelize.STRING,
  },
  fecha: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
