const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
    "userId" : { 
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
        type : Array
    },
})

module.exports = model('Philanthropist', PostSchema);