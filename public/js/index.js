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
       socket.on('newMsgLocation', function(message){
          var li = jQuery('<li></li>');
          var a = jQuery('<a target="_blank">My current location</a>');
          li.text(`${message.from}: `);
          a.attr('href',message.url);
          li.append(a);
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
       var locationButton = jQuery('#send-location');
       locationButton.on('click', function(){
        if(!navigator.geolocation){
            alert('Geolocation is not supproted by your browser');
        }
        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('getLocation',{
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
       },function(){
            alert('Unable to fetch location');
        });
       });

