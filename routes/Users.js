//aquí declaramos las rutas para nuestro user
const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.get("/", (req, res) => {
  res.json({ status: "API WORKS" });
});

// LISTAR USUARIOS
users.get("/ListarUsuarios", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findAll({
    where: {
      marca: decoded.marca,
    },
  })
    .then((user) => {
      if (user) {
        // res.json({ status: "API WORKS" })
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//Eliminar Usuario
users.get("/ListarUsuarios/:id", (req, res) => {
  // var decoded = jwt.verify(
  //   req.headers["authorization"],
  //   process.env.SECRET_KEY
  // );
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// REGISTRO
users.post("/register", (req, res) => {
  const today = new Date();

  //res.send(console.log(req.body));
  const userData = {
    usuario: req.body.usuario,
    password: req.body.password,
    user_type: req.body.user_type,
    region: req.body.region,
    marca: req.body.marca,
    created: today,
  };
  User.findOne({
    where: {
      usuario: req.body.usuario,
    },
  })
    //TODO bcrypt
    .then((user) => {
      if (!user) {
        User.create(userData)
          .then((user) => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
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

// LOGIN
users.post("/login", (req, res) => {
  console.log("works");
  User.findOne({
    where: {
      usuario: req.body.usuario,
      password: req.body.password,
    },
  })
    .then((user) => {
      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        res.json({ token: token });
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// REGRESAR INFORMACION DE EL ID SELECCIONADO PARA EDIRTAR
users.get("/EditarUsuario/:id", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = users;
