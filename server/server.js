const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname ,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' ,(socket)=>{
console.log('New User Connected');


socket.on('createMsg', (msg)=>{
  console.log('CreatedMsg',msg);
  io.emit('newMsg',{
    from: msg.from,
    text : msg.text,
    createdAt : new Date().getTime()

  });
});

socket.on('disconnect' , ()=>{
    console.log('user is disconnected');
});
});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

