require("dotenv").config()
const {Sequelize} = require("sequelize")

const connection = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: 'mariadb'
    })
connection.authenticate()

module.exports = connection
