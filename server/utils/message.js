var generateMessage = (from,text)=>{
return {
    from,
    text,
    createdAt : new Date().getTime()
};
};
var generateNewMessageLocation = (from,latitude , longitude)=>{
    return {
        from ,
        url : "https://www.google.co.in/maps?q="+ latitude +"," +longitude,
        createdAt : new Date().getTime()

    }
}

module.exports = {generateMessage,generateNewMessageLocation};