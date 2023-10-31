require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT

app.use(express.json())

const userRouter = require("./users/routes")

const User = require("./users/model")
const syncTables = () => {
    User.sync({alter:true});
}

app.get("/health", (req, res) => {
    res.status(200).json({message:"API is working"})
})
// app.use((req, res) => {
//     res.send('<h1>HTTP is working!</h1>');
// });

app.use(userRouter)
app.listen(port, () => {
    syncTables()
    console.log (`Server is listening on port ${port}`)
})

