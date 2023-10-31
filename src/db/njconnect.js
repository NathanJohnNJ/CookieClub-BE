require("dotenv").config()
const {Sequelize} = require("sequelize")

const njconnect = new Sequelize(process.env.NJDATABASE, process.env.USERNAME, process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: 'mariadb'
    })
njconnect.authenticate()

module.exports = njconnect
