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

//EliminarAuto
autos_tanques.get("/EliminarAutoTanque/:id_autoTanque", (req, res) => {
  AutoTanque.destroy({
    where: {
      id_autoTanque: req.params.id_autoTanque,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
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

// REGRESAR INFORMACION DE EL ID SELECCIONADO PARA EDIRTAR
autos_tanques.get("/ListarActualizarAutoTanque/:id_autoTanque", (req, res) => {
  AutoTanque.findOne({
    where: {
      id_autoTanque: req.params.id_autoTanque,
    },
  })
    .then((AutoTanque) => {
      if (AutoTanque) {
        res.json(AutoTanque);
      } else {
        res.send("AutoTanque does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = autos_tanques;
