const express  = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require("./models");
const cors = require('cors')

const port = 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db.sequelize.sync({alter:true})





require('./controller/user.controller')(app)
require('./controller/friendship.controller')(app)


app.listen(port,()=>
{
    console.log("Listen on port ",port)

})