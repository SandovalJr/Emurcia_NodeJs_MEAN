//aquí declaramos las rutas para nuestros Autos
const express = require("express");
const autos_tanques = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const AutoTanque = require("../models/AuntoTanque");
autos_tanques.use(cors());

process.env.SECRET_KEY = "secret";

autos_tanques.get("/", (req, res) => {
  res.json({ status: "API AUTO TANQUE WORKS" });
});

module.exports = autos_tanques;
