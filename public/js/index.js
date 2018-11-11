

var socket =  io();
       socket.on('connect' , function(){
           console.log('Connected to server');
       });
       socket.on('disconnect', function(){
           console.log('Disconnected from server');
       })
       socket.on('newMsg',function(msg){
        var formattedTime = moment(msg.createdAt).format('h:mm a');
           var template = jQuery('#messsage-template').html()
           var html = Mustache.render(template,{
               text : msg.text,
               from : msg.from,
               createdAt : formattedTime
           });
           jQuery('#messages').append(html);

            
        //    var li = jQuery('<li></li>');
        //    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
        //    jQuery('#messages').append(li);
       });
       socket.on('newMsgLocation', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-messsage-template').html()
        var html = Mustache.render(template,{
            url : message.text,
            from : message.from,
            createdAt : formattedTime
        });

        //   var li = jQuery('<li></li>');
        //   var a = jQuery('<a target="_blank">My current location</a>');
        //   li.text(`${message.from} ${formattedTime} : `);
        //   a.attr('href',message.url);
        //   li.append(a);
          jQuery('#messages').append(html);
       });
       socket.emit('createMsg',{
           from :'Frank',
           text : 'Hi'
       },function(data){
           console.log('Got it', data)
       });
     
       var msgText = jQuery('[name=message]');
       jQuery('#message-forms').on('submit' , function(e){
           e.preventDefault();

          socket.emit('createMsg',{
            from :'user',
            text : msgText.val()
          },function(){
           msgText.val('');
          }); 
       });
       var locationButton = jQuery('#send-location');
       locationButton.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocation is not supproted by your browser');
        }
        locationButton.attr('disabled','disabled').text('Sending Location..');
        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('getLocation',{
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
       },function(){
           locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });
       });

