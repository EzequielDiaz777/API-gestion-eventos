const { Participacion, Asistente, Evento } = require("../models/relaciones");
const PDFDocument = require('pdfkit');
const { format } = require('date-fns');
const { es } = require('date-fns/locale');

// Función para generar el PDF del certificado
function generarCertificadoPdf(nombre, evento, fecha) {
    const fechaFormateada = format(new Date(fecha), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.fontSize(25).text(`Certificado de Participación`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Nombre: ${nombre}`, { align: 'left' });
    doc.fontSize(18).text(`Evento: ${evento}`, { align: 'left' });
    doc.fontSize(18).text(`Fecha: ${fechaFormateada}`, { align: 'left' });
    return doc;
}

const participacionController = {
    crearParticipacion: async (req, res) => {
        try {
            const { idAsistente, idEvento } = req.body;
            const nuevaParticipacion = await Participacion.create({ idAsistente, idEvento, confirmacion: false });
            res.status(201).json(nuevaParticipacion);
        } catch (error) {
            res.status(500).json({ error: "Error al registrar la participación" });
        }
    },

    generarCertificado: async (req, res) => {
        try {
            const { idParticipacion } = req.params;
            const participacion = await Participacion.findByPk(idParticipacion, { include: [Asistente, Evento] });
            if (!participacion) {
                return res.status(404).json({ error: "Participación no encontrada" });
            }
            const { nombre } = participacion.Asistente;
            const { nombre: evento, fecha } = participacion.Evento;
            const doc = generarCertificadoPdf(nombre, evento, fecha);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=certificado_${nombre}_${evento}.pdf`);
            doc.pipe(res);
            doc.end();
        } catch (error) {
            res.status(500).json({ error: "Error al generar el certificado" });
        }
    },

    actualizarConfirmacion: async (req, res) => {
        try {
            const { idParticipacion } = req.params;
            const { confirmacion } = req.body;
            const [updated] = await Participacion.update({ confirmacion }, { where: { idParticipacion } });
            if (!updated) {
                return res.status(404).json({ error: "Participación no encontrada" });
            }
            res.status(200).json({ message: "Confirmación actualizada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la confirmación" });
        }
    },

    confirmarParticipacion: async (req, res) => {
        try {
            const { idParticipacion } = req.params;
            const [updated] = await Participacion.update({ confirmacion: true }, { where: { idParticipacion } });
            if (!updated) {
                return res.status(404).json({ error: "Participación no encontrada" });
            }
            res.status(200).json({ message: "Participación confirmada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al confirmar la participación" });
        }
    },

    obtenerParticipaciones: async (req, res) => {
        try {
            const participaciones = await Participacion.findAll({ include: [Asistente, Evento] });
            res.status(200).json(participaciones);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las participaciones" });
        }
    },

    eliminarParticipacion: async (req, res) => {
        try {
            const { idParticipacion } = req.params;
            const deleted = await Participacion.destroy({ where: { idParticipacion } });
            if (!deleted) {
                return res.status(404).json({ error: "Participación no encontrada" });
            }
            res.status(200).json({ message: "Participación eliminada exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la participación" });
        }
    },

    obtenerParticipacionesPorConfirmar: async (req, res) => {
        try {
            const participaciones = await Participacion.findAll({
                where: { confirmacion: false },
                include: [Asistente, Evento]
            });
            res.status(200).json(participaciones);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las participaciones por confirmar" });
        }
    },

    obtenerParticipacionesConfirmadas: async (req, res) => {
        try {
            const participaciones = await Participacion.findAll({
                where: { confirmacion: true },
                include: [Asistente, Evento]
            });
            res.status(200).json(participaciones);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las participaciones confirmadas" });
        }
    },

    obtenerParticipacionPorId: async (req, res) => {
        try {
            const { idParticipacion } = req.params;
            const participacion = await Participacion.findByPk(idParticipacion, { include: [Asistente, Evento] });
            if (!participacion) {
                return res.status(404).json({ error: "Participación no encontrada" });
            }
            res.status(200).json(participacion);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la participación" });
        }
    },
};

module.exports = participacionController;
