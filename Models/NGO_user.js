const { model, Schema } = require("mongoose");

const NGOuserSchema = new Schema({
    "name" : { 
        type : String, 
        required : true
    },
    "email_id" : {
        type : String,
        required : false
    },
    "contact" : {
        type : String,
        required : true
    },
    "end_goal" : {
        type : String,
        required : true
    },
    "prev_works" : {
        type : String,
        required : true
    },
    "plan" : {
        type : String,
        required : true
    },
    "gallery" : {
        type : Array,
        default : [],
        required : false
    },
    "agendas" : {
        type : Array,
        default : [],
        required : true
    },
    "fund_required" : {
        type : Number,
        required : true
    },
    "fund_received" : {
        type : Number,
        required : true
    },
})

module.exports = model('NGO', NGOuserSchema);