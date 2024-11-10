const express = require("express");
const router = express.Router();
const { participacionController } = require("../controllers/indexController");

// Definir las rutas para Participacion
router.post("/", participacionController.crearParticipacion);
router.get("/", participacionController.obtenerParticipaciones);
router.get("/:id", participacionController.obtenerParticipacionPorId);
router.put("/:id", participacionController.actualizarConfirmacion);
router.delete("/:id", participacionController.eliminarParticipacion);

module.exports = router;
