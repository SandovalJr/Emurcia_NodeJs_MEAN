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

// Registrar AutoTanque
autos_tanques.post("/AgregarAutoTanque", (req, res) => {
  const today = new Date();
  //res.send(console.log(req.body));
  const AutosTanqueData = {
    Num_eco: req.body.Num_eco,
    anio: req.body.anio,
    ubicacion: req.body.ubicacion,
    num_serie: req.body.num_serie,
    marca_auto: req.body.marca_auto,
    modelo: req.body.modelo,
    placas: req.body.placas,
    chofer_ruta: req.body.chofer_ruta,
    cilindros_piezas: req.body.cilindros_piezas,
    observaciones: req.body.observaciones,
    AutoTanque: req.body.AutoTanque,
    Porcentaje_Salida_Llegada: req.body.Porcentaje_Salida_Llegada,
    marca: req.body.marca,
    created: today,
  };
  console.log("body", req.body);
  AutoTanque.findOne({
    where: {
      num_serie: req.body.num_serie,
    },
  })
    //TODO bcrypt
    .then((autoTanque) => {
      if (!autoTanque) {
        AutoTanque.create(AutosTanqueData)
          .then(function (NewAutoTanque) {
            res.status(200).json(NewAutoTanque);
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
      res.send("error ya existe el auto tanque: " + err);
    });
});

// Actualizar AutoTanque
autos_tanques.put("/ActualizarAutoTanque/:id_autoTanque", (req, res) => {
  const Autos_TanquesData = {
    Num_eco: req.body.Num_eco,
    anio: req.body.anio,
    ubicacion: req.body.ubicacion,
    num_serie: req.body.num_serie,
    marca_auto: req.body.marca_auto,
    modelo: req.body.modelo,
    placas: req.body.placas,
    chofer_ruta: req.body.chofer_ruta,
    cilindros_piezas: req.body.cilindros_piezas,
    observaciones: req.body.observaciones,
    AutoTanque: req.body.AutoTanque,
    Porcentaje_Salida_Llegada: req.body.Porcentaje_Salida_Llegada,
    marca: req.body.marca,
  };
  console.log(Autos_TanquesData);
  AutoTanque.update(Autos_TanquesData, {
    where: {
      id_autoTanque: req.params.id_autoTanque,
    },
  })
    .then(function (autoActualizado) {
      res.status(200).json(autoActualizado);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

//Eliminar Auto Tanque
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
