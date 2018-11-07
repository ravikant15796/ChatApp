var path = require('path');
var express = require('express');
var publicPath = path.join(__dirname ,'../public');
var port = process.env.PORT || 3000
var app = express();
app.use(express.static(publicPath));

app.listen(port , ()=>{
    console.log(`server is up on ${port}`);
})