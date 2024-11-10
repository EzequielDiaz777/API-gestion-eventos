const express = require("express");
const router = express.Router();

const asistenteRoutes = require("./asistenteRoutes");
const eventoRoutes = require("./eventoRoutes");
const participacionRoutes = require("./participacionRoutes");

// Conectar las rutas a sus respectivos endpoints
router.use("/asistentes", asistenteRoutes);
router.use("/eventos", eventoRoutes);
router.use("/participaciones", participacionRoutes);

module.exports = router;
