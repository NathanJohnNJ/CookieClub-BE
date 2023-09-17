const {Sequelize} = require("sequelize")
const connection = new Sequelize("mysql://u25bqydlinc2vfzs:ROtaBMUbgQlCOT1gM7fu@bvkyqz8klv5oqrguem4j-mysql.services.clever-cloud.com:3306/bvkyqz8klv5oqrguem4j",{
dialect: 'mysql'
})
connection.authenticate()

module.exports = connection
