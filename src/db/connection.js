const {Sequelize} = require("sequelize") //SQL System
const connection = new Sequelize(process.env.SQL_URI)
connection.authenticate()

module.exports = connection