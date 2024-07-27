const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();

app.use(cors());
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cargar configuración de la base de datos
const config = require('./config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Configurar Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Autenticar conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

require('./routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));


const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log(`Server is listening on port ${port}`);

module.exports = app;
