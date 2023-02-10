const { model, Schema } = require("mongoose");

const PilanthropistuserSchema = new Schema({
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
    "agendas" : {
        type : Array,
        default : [],
        required : false
    },
    "NGOs_donated_to" : {
        type : Array,
        default : [],
        required : false
    },
})

module.exports = model('Philanthropist', PilanthropistuserSchema);