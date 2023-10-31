require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT

app.use(express.json())
app.use(cors())

async function getIP(){
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const jsonData = await response.json();
    const iP = jsonData.ip;
    console.log(iP);
    return iP;
  } catch (error) {
    return error;
  }
};

const displayOrigin = () => {
  async function getOrigin(){
    const originIP = await getIP();
    const fullOrigin = `http://${originIP}:3000`;
    console.log(fullOrigin);
    return fullOrigin;
  }
  getOrigin();
  return;
}

const userRouter = require("./users/routes")
const njRouter = require("./njtd/routes")

const User = require("./users/model")
const Nj = require("./njtd/model")
const syncTables = () => {
    User.sync({alter:true});
    Nj.sync({alter:true});
}
const oriGin = displayOrigin();
console.log(oriGin);
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "http://cookieclub.njtd.xyz");
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
app.use(njRouter)
app.listen(port, () => {
    syncTables()
    console.log (`Server is listening on port ${port}`)
})

