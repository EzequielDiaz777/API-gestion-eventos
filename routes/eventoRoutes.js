const express = require("express");
const router = express.Router();
const { eventoController } = require("../controllers/indexController");

// Definir las rutas para Evento
router.post("/", eventoController.crearEvento);
router.get("/", eventoController.obtenerEventos);
router.get("/:id", eventoController.obtenerEventoPorId);
router.put("/:id", eventoController.actualizarEvento);
router.delete("/:id", eventoController.eliminarEvento);

module.exports = router;
