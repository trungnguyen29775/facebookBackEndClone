const express  = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require("./models");
const cors = require('cors')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { log } = require('console');

const httpServer = createServer(app);

const port = 5000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db.sequelize.sync({alter:true})





require('./controller/user.controller')(app)
require('./controller/friendship.controller')(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
   console.log("Client Connection", socket.id);
   
    socket.on('online',(onlineUser)=>{
    socket.join(onlineUser)
    console.log("User Online: ",onlineUser.userName)
   
   })

   socket.on('sendMess',(data)=>{
    const currentUserName = data.sender
    const targetUserName = data.receiver
    socket.join([currentUserName,targetUserName])
    io.to(targetUserName).emit('receivedMessage',{sender:data.sender,message:data.message, receiver:data.receiver})
   })

   socket.on('disconnect', () => {});

  });



httpServer.listen(port,()=>
{
    console.log("Listen on port ",port)
});
