const { model, Schema } = require("mongoose");

const ConversationSchema = new Schema({
    "members" : {
        type : Array,
    },
})

module.exports = model('Conversation', ConversationSchema);