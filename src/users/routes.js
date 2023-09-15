const { Router } = require("express")
const userRouter = Router()
const { getAllUsers, addUser, updateUser, deleteUser, deleteAll} = require("./controllers")
const { hashPass, comparePass, tokenCheck } = require("../middleware/index")

userRouter.post("/users/register", hashPass, addUser)
userRouter.post("/users/login", comparePass, login)

//Customised
userRouter.get("/user/find/all", tokenCheck, getAllUsers)
userRouter.delete("/user/delete", tokenCheck, deleteUser)
userRouter.put("/user/edit", tokenCheck, updateUser)
userRouter.get("/user/find", tokenCheck, findUser)

module.exports = userRouter


