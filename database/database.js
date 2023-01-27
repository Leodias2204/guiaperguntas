const Sequelize = require('sequelize')


//configuração para integrar o sequelize ao My SQL.

const connection = new Sequelize('guiaperguntas', 'root', 'Leo2204@', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection
