const { model, Schema } = require("mongoose");

const GroupSchema = new Schema({
    "name" : { 
        type : String, 
        required : true,
        min : 3,
        max :20,
        unique : true
    },
    "members" : {
        type : Array,
    },
    "posts" : {
        type : Array
    },
})

module.exports = model('Philanthropist', GroupSchema);