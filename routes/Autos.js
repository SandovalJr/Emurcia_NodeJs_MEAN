//aquí declaramos las rutas para nuestro user
const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = "secret";




module.exports = users;
