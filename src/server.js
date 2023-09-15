require("dotenv").config()

//Express
const express = require("express") 
const app = express() // API
const cors = require("cors")
const port = process.env.PORT || 5001

//Midleware
app.use(express.json())
app.use(cors())

//Routes
const userRouter = require("./users/routes")

//Models
const User = require ("./users/model")

const syncTables = () => {
    User.sync({alter:true});
}

app.get("/health", (req, res) => {
    res.status(200).json({message:"API is working"})
})

app.use(userRouter)
app.listen(port, () => {
    syncTables()
    console.log (`Server is listening on port ${port}`)
})

