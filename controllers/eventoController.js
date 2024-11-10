// controllers/eventoController.js
const { Evento } = require('../models/relaciones');
// obtenerEventosFuturos
const eventoController = {
    crearEvento: async (req, res) => {
        try {
            const evento = await Evento.create(req.body);
            res.json(evento);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el evento' });
        }
    },

    obtenerEventos: async (req, res) => {
        try {
            const eventos = await Evento.findAll();
            res.json(eventos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener eventos' });
        }
    },

    obtenerEventoPorId: async (req, res) => {
        try {
            const evento = await Evento.findByPk(req.params.id);
            if (!evento) {
                return res.status(404).json({ error: 'Evento no encontrado' });
            }
            res.json(evento);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener eventos' });
        }
    },

    actualizarEvento: async (req, res) => {
        try {
            const evento = await Evento.update(req.body, { where: { id: req.params.id } });
            res.json(evento);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar evento' });
        }
    },

    eliminarEvento: async (req, res) => {
        try {
            await Evento.destroy({ where: { id: req.params.id } });
            res.json({ mensaje: 'Evento eliminado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar evento' });
        }
    },
};

module.exports = eventoController;