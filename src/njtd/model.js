const { DataTypes } = require("sequelize")
const njconnect = require("../db/njconnect")
const Nj = njconnect.define("Nj", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {indexes: [{unique: true, fields:["username"]}]}
)

module.exports = Nj
