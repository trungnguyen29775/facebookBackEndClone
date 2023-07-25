const express  = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(morgan('combined'))
const port = 5000

app.get('/api/search',(req,res)=>
{
    const searchQuery = req.query.q;
    const data = handleData(searchQuery)
    res.send(data)

})



app.post('/',(req,res)=>
{
    res.send({
        data:"got data"
    })
})

app.listen(port,()=>
{
    console.log("Listen on port ",port)

})