"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Asistente extends Model { }
const asistente = Asistente.init(
    {
        idAsistente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domicilio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        modelName: "Asistente",
        tableName: "asistente",
    }
);
module.exports = asistente;