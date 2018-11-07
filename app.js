var path = require('path');
var express = require('express');
var publicPath = path.join(__dirname,'/public' );

console.log(publicPath);
var app = express();
app.use(express.static(publicPath));

app.listen(3000 , ()=>{
    console.log('At 3000 port')
})