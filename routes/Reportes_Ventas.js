//aquí declaramos las rutas para nuestros Autos
const express = require("express");
const reportes_ventas = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Reporte_Venta = require("../models/Reporte_Venta");
reportes_ventas.use(cors());

// variables deben ser unicas
//  nunca deben iniciar con mayusculas
//  cuando haga referencia de la bd ponerle difentes nombre o data algo para referenciarlo

process.env.SECRET_KEY = "secret";

reportes_ventas.get("/", (req, res) => {
  res.json({ status: "API REPORTES DE VENTAS WORKS" });
});

// Registrar Reporte de venta
reportes_ventas.post("/AgregarVentaAlReporte", (req, res) => {
  const today = new Date();
  const fecha = `${today.getDate()}-${today.getMonth}-${today.getFullYear}`;
  //res.send(console.log(req.body));

  const VentaData = {
    marca: req.body.marca,
    region: req.body.region,
    auto: req.body.auto,
    Cilidros_Vacios: req.body.Cilidros_Vacios,
    Venta_Kilos: req.body.Venta_Kilos,
    Precio_Prom: req.body.Precio_Prom,
    Importe_Liquidar: req.body.Importe_Liquidar,
    Recibe_caja_efectivo: req.body.Recibe_caja_efectivo,
    credito_cilindro: req.body.credito_cilindro,
    Importe_credito: req.body.Importe_credito,
    Cel_Tel_Cliente: req.body.Cel_Tel_Cliente,
    Litros_Consumo: req.body.Litros_Consumo,
    INV_CIL: req.body.INV_CIL,
    Equiv_KG: req.body.Equiv_KG,
    T_INV_CIL: req.body.T_INV_CIL,
    T_Equiv_KG: req.body.T_Equiv_KG,
    Total_KilosV: req.body.Total_KilosV,
    Total_CilindrosV: req.body.Total_CilindrosV,
    Total_caja_efectivo: req.body.Total_caja_efectivo,
    T_credito_cilindro: req.body.T_credito_cilindro,
    T_Importe_credito: req.body.T_Importe_credito,
    Comentarios: req.body.Comentarios,
    createdAt: today,
  };
  console.log("body", req.body);
  Reporte_Venta.findOne({
    where: {
      auto: req.body.auto,
      //   fecha: req.body.fecha,
    },
  })
    //TODO bcrypt
    .then((Reporte_Venta_Data) => {
      if (!Reporte_Venta_Data) {
        //   const NewReporte_Venta = Reporte_Venta
        Reporte_Venta.create(VentaData)
          .then(function (NewReporte_Venta) {
            res.status(200).json(NewReporte_Venta);
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
      res.send("error ya se registro esta venta " + err);
    });
});

// Eliminar Venta
reportes_ventas.get("/EliminarVenta/:id_RV", (req, res) => {
  Reporte_Venta.destroy({
    where: {
      id_RV: req.params.id_RV,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// Listar por ID para update
reportes_ventas.get("/ListarIdRV/:id_RV", (req, res) => {
  Reporte_Venta.findOne({
    where: {
      id_RV: req.params.id_RV,
    },
  })
    .then((DataDeVenta) => {
      if (DataDeVenta) {
        res.json(DataDeVenta);
      } else {
        res.send("La venta seleccionada does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// LISTAR REGISTROS DE VENTA POR LA FECHA
reportes_ventas.get(
  "/listarReportesVentas/:marca/:region/:createdAt",
  (req, res) => {
    Reporte_Venta.findAll({
      where: {
        marca: req.params.marca,
        region: req.params.region,
        createdAt: req.params.createdAt,
      },
    })
      .then(function (data) {
        console.log(createdAt);
        console.log("dataaaaaaaaaaaaaaaaaaaaaaa");
        console.log(data);
        res.status(200).json(data);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  }
);

module.exports = reportes_ventas;
