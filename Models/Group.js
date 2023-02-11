const { model, Schema } = require("mongoose");

const GroupSchema = new Schema({
    "name" : { 
        type : String, 
        required : true,
        min : 3,
        max :20,
        unique : true
    },
    "admin" : {
        type : String,
        required : true
    },
})

module.exports = model('Group', GroupSchema);