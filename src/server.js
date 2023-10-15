require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT

app.use(express.json())
app.use(cors())

const userRouter = require("./users/routes")

const User = require ("./users/model")

const syncTables = () => {
    User.sync({alter:true});
}

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "https://localhost/");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    next()
  });

app.get("/health", (req, res) => {
    res.status(200).json({message:"API is working"})
})
app.use((req, res) => {
    res.send('<h1>HTTP is working!</h1>');
});

app.use(userRouter)
app.listen(port, () => {
    syncTables()
    console.log (`Server is listening on port ${port}`)
})

