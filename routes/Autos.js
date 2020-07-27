//aquí declaramos las rutas para nuestros Autos
const express = require("express");
const autos = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Auto = require("../models/Auto");
autos.use(cors());

process.env.SECRET_KEY = "secret";

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
          .then((auto) => {
            let token = jwt.sign(auto.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.json({ token: token });
          })
          .catch((err) => {
            res.send("error: " + err);
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

module.exports = autos;
