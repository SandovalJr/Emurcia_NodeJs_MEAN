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

// LISTAR AUTOS TANQUES
autos_tanques.get("/ListarAutoTanques/:marca", (req, res) => {
  AutoTanque.findAll({
    where: {
      marca: req.params.marca,
    },
  })
    .then(function (autoTanques) {
      res.status(200).json(autoTanques);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});


module.exports = autos_tanques;
