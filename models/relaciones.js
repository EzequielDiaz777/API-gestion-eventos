const sequelize = require("../config/db");
const Asistente = require("./asistente");
const Evento = require("./evento");
const Participacion = require("./participacion");

Asistente.hasMany(Participacion, { foreignKey: "idAsistente" });
Evento.hasMany(Participacion, { foreignKey: "idEvento" });
Participacion.belongsTo(Asistente, { foreignKey: "idAsistente" });
Participacion.belongsTo(Evento, { foreignKey: "idEvento" });

module.exports = { Asistente, Evento, Participacion };
