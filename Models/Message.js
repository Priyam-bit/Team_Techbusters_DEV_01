const { model, Schema } = require("mongoose");

const MessageSchema = new Schema({
    "conversationId" : { 
        type : String, 
        required : true,
    },
    "senderId" : {
        type : String,
        required : true,
    },
    "text" : {
        type : String,
        required : true,
        max : 500
    },
})

module.exports = model('Philanthropist', MessageSchema);