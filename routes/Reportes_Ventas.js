//aquí declaramos las rutas para nuestros Autos
const express = require("express");
const reportes_ventas = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Reporte_Venta = require("../models/AuntoTanque");
reportes_ventas.use(cors());

process.env.SECRET_KEY = "secret";

reportes_ventas.get("/", (req, res) => {
  res.json({ status: "API REPORTES DE VENTAS WORKS" });
});

module.exports = reportes_ventas;
