const { Asistente } = require("../models/relaciones");

const asistenteController = {
    // Crear un nuevo asistente
    crearAsistente: async (req, res) => {
        try {
            const { nombre, domicilio, email, estado } = req.body;
            await Asistente.create({ nombre, domicilio, email, estado });
            res.status(201).json({ message: "Asistente dado de alta exitosamente!" });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el asistente" });
        }
    },

    // Obtener todos los asistentes
    obtenerAsistentes: async (req, res) => {
        try {
            const asistentes = await Asistente.findAll();
            res.status(200).json(asistentes);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los asistentes" });
        }
    },

    // Obtener un asistente por ID
    obtenerAsistentePorId: async (req, res) => {
        try {
            const { idAsistente } = req.params;
            const asistente = await Asistente.findByPk(idAsistente);
            console.log(asistente);
            if (!asistente) {
                return res.status(404).json({ error: "Asistente no encontrado" });
            }
            res.status(200).json(asistente);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el asistente" });
        }
    },

    // Actualizar un asistente
    actualizarAsistente: async (req, res) => {
        try {
            const { idAsistente } = req.params;
            const { nombre, domicilio, email, estado } = req.body;
            const [updated] = await Asistente.update(
                { nombre, domicilio, email, estado },
                { where: { idAsistente } }
            );
            if (!updated) {
                return res.status(404).json({ error: "Asistente no encontrado" });
            }
            res.status(200).json({ message: "Asistente actualizado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el asistente" });
        }
    },

    // Eliminar un asistente
    eliminarAsistente: async (req, res) => {
        try {
            const { idAsistente } = req.params;
            const deleted = await Asistente.destroy({ where: { idAsistente } });
            if (!deleted) {
                return res.status(404).json({ error: "Asistente no encontrado" });
            }
            res.status(200).json({ message: "Asistente eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el asistente" });
        }
    },
};

module.exports = asistenteController;
