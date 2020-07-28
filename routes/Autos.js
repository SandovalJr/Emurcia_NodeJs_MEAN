//aquí declaramos las rutas para nuestros Autos
const express = require("express");
const autos = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Auto = require("../models/Auto");
autos.use(cors());

process.env.SECRET_KEY = "secret";

autos.get("/", (req, res) => {
  res.json({ status: "API AUTO WORKS" });
});

// REGISTRO
autos.post("/registerAutos", (req, res) => {
  const today = new Date();

  //res.send(console.log(req.body));
  const AutosData = {
    Num_eco: req.body.Num_eco,
    año: req.body.año,
    ubicacion: req.body.ubicacion,
    num_serie: req.body.num_serie,
    marca_auto: req.body.marca_auto,
    modelo: req.body.modelo,
    placas: req.body.placas,
    chofer_ruta: req.body.chofer_ruta,
    cilindros_piezas: req.body.cilindros_piezas,
    created: today,
  };
  Auto.findOne({
    where: {
      num_serie: req.body.num_serie,
    },
  })
    //TODO bcrypt
    .then((auto) => {
      if (!auto) {
        Auto.create(AutosData)
          .then(function (newAuto) {
            res.status(200).json(newAuto);
          })
          .catch(function (error) {
            res.status(500).json(error);
          });
      } else {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//EliminarAuto
autos.get("/EliminarAuto/:id_auto", (req, res) => {
  // var decoded = jwt.verify(
  //   req.headers["authorization"],
  //   process.env.SECRET_KEY
  // );
  Auto.destroy({
    where: {
      id_auto: req.params.id_auto,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = autos;
