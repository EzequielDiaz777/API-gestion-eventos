// app.js

/*

*/
const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
}));

// Rutas
const routes = require('./routes/indexRoutes');
app.use('/', routes);

// Iniciar el servidor
app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});
