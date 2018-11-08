const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname ,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection' ,(socket)=>{
console.log('New User Connected');

socket.emit('newMsg',generateMessage(
    'Admin' ,
    'Welcome to App'
));
socket.broadcast.emit('newMsg',generateMessage(
    'Admin',
    'A new User has Joined'
));
 socket.on('createMsg', (msg)=>{
  console.log('CreatedMsg',msg);
  io.emit('newMsg',generateMessage(msg.from , msg.text));
});

socket.on('disconnect' , ()=>{
    console.log('user is disconnected');
});
});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

