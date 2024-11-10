const express = require("express");
const router = express.Router();
const { asistenteController } = require("../controllers/indexController");

// Definir las rutas para Asistente
router.post("/", asistenteController.crearAsistente);
router.get("/", asistenteController.obtenerAsistentes);
router.get("/:idAsistente", asistenteController.obtenerAsistentePorId);
router.put("/:idAsistente", asistenteController.actualizarAsistente);
router.delete("/:idAsistente", asistenteController.eliminarAsistente);

module.exports = router;
