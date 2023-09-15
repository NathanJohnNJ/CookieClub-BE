const { Router } = require("express")
const userRouter = Router()
const { registerUser, login, findUser, findAll, updateUser, deleteUser } = require("./controllers")
const { hashPass, comparePass, tokenCheck } = require("../middleware/index")

userRouter.post("/users/register", hashPass, registerUser)
userRouter.post("/users/login", comparePass, login)
userRouter.delete("/users/delete", tokenCheck, deleteUser)
userRouter.put("/users/edit", tokenCheck, updateUser)
userRouter.get("/users/find", tokenCheck, findUser)
userRouter.get("/users/findAll", tokenCheck, findAll)

module.exports = userRouter


