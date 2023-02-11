const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
    "userId" : { 
        type : String, 
        required : true,
    },
    "groupId" : {
        type : String, 
        required : true,
    },
    "desc" : {
        type : String,
        required : false,
        max :500,
    },
    "img" : {
        type : String,
        required : false,
    },
    "likes" : {
        type : Array,
        default : [],
        required : false
    },
})

module.exports = model('Post', PostSchema);