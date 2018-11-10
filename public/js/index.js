var socket =  io();
       socket.on('connect' , function(){
           console.log('Connected to server');
       });
       socket.on('disconnect', function(){
           console.log('Disconnected from server');
       })
       socket.on('newMsg',function(msg){
           console.log('newMsg', msg)
           var li = jQuery('<li></li>');
           li.text(`${msg.from}: ${msg.text}`);
           jQuery('#messages').append(li);
       });
       socket.emit('createMsg',{
           from :'Frank',
           text : 'Hi'
       },function(data){
           console.log('Got it', data)
       });

       jQuery('#message-forms').on('submit' , function(e){
           e.preventDefault();

          socket.emit('createMsg',{
            from :'user',
            text : jQuery('[name=message]').val()
          },function(){

          }); 
       });
