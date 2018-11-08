var socket =  io();
       socket.on('connect' , function(){
           console.log('Connected to server');
       });
       socket.on('disconnect', function(){
           console.log('Disconnected from server');
       })
       socket.on('newMsg',(msg)=>{
           console.log('newMsg', msg);
       });
        
