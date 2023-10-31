const { Router } = require("express")
const njRouter = Router()
const { registerNj, login } = require("./controllers")
const { hashPass, comparePass } = require("../middleware/index")

njRouter.post("/njtd/register", hashPass, registerNj)
njRouter.post("/njtd/login", comparePass, login)

module.exports = njRouter


