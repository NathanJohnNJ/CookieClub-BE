const { Router } = require("express")
const userRouter = Router()
const { registerUser, login, findUser, findAll, updateUsername, updatePassword, updateEmail, deleteUser } = require("./controllers")
const { hashPass, comparePass, tokenCheck } = require("../middleware/index")

userRouter.post("/users/register", hashPass, registerUser)
userRouter.post("/users/login", comparePass, login)
userRouter.delete("/users/delete", tokenCheck, deleteUser)
userRouter.put("/users/updateUsername", tokenCheck, updateUsername)
userRouter.put("/users/updatePassword", tokenCheck, updatePassword)
userRouter.put("/users/updateEmail", tokenCheck, updateEmail)
userRouter.get("/users/find", tokenCheck, findUser)
userRouter.get("/users/findAll", tokenCheck, findAll)

module.exports = userRouter


