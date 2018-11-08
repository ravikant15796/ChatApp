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

socket.emit('newMsg',{
  form : 'john',
  text : "Hi everything is good here",
  createdAt : '21112'
});
socket.on('createMsg', (msg)=>{
  console.log('CreatedMsg',msg);
});

socket.on('disconnect' , ()=>{
    console.log('user is disconnected');
});
});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

