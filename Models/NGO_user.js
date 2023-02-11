const { model, Schema } = require("mongoose");

const NGOuserSchema = new Schema({
    "name" : { 
        type : String, 
        required : true,
        min : 3,
        max :20,
        unique : true
    },
    "email" : {
        type : String,
        required : false,
        max :50,
        unique : true,
    },
    "password" : {
        type : String,
        required : true,
        min : 6
    },
    "contact" : {
        type : String,
        required : true,
        max : 20
    },
    "end_goal" : {
        type : String,
        required : true,
        max : 1000
    },
    "prev_works" : {
        type : String,
        required : true,
        max : 1000
    },
    "plan" : {
        type : String,
        required : true,
        max : 5000
    },
    "gallery" : {
        type : Array,
        default : [],
        required : false
    },
    "agendas" : {
        type : Array,
        default : [],
        required : false
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