const express  = require('express')
const app = express()
const morgan = require('morgan')
const db = require("./models");
const cors = require('cors')

const port = 5000

app.use(cors())

db.sequelize.sync()

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>
{
    console.log("Listen on port ",port)

})