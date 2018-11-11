var moment = require('moment');
var generateMessage = (from,text)=>{
return {
    from,
    text,
    createdAt : moment.valueOf()
};
};
var generateNewMessageLocation = (from,latitude , longitude)=>{
    return {
        from ,
        url : "https://www.google.co.in/maps?q="+ latitude +"," +longitude,
        createdAt :  moment.valueOf()

    }
}

module.exports = {generateMessage,generateNewMessageLocation};