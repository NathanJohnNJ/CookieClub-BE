const {Sequelize} = require("sequelize")
const connection = new Sequelize(process.env.SQL_URI,{
dialect: 'mysql'
})
connection.authenticate()

module.exports = connection
