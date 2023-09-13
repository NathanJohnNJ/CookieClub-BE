const { Router } = require("express")

const userRouter = Router()


const { registerUser, login, findUser, updateUser, deleteUser, findAllUsers} = require("./controllers")
const { hashPass, comparePass, tokenCheck } = require("../middleware/index")

userRouter.post("/users/register", hashPass, registerUser)
userRouter.post("/users/login", comparePass, login)

//Customised
userRouter.get("/user/find/all", tokenCheck, findAllUsers)
userRouter.delete("/user/delete", tokenCheck, deleteUser)
userRouter.put("/user/edit", tokenCheck, updateUser)
userRouter.get("/user/find", tokenCheck, findUser)

module.exports = userRouter


