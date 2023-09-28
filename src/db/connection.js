const {Sequelize} = require("sequelize")

const connection = new Sequelize(process.env.database, process.env.username, process.env.password,{
    host: 'localhost',
    dialect: 'mariadb'
    })
connection.authenticate()

module.exports = connection
