var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    _id:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    fname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    role:{
        type: String
    },
    token:{
        type: String,
    },
})


var userdetailsdb= mongoose.model('users',userSchema);//table name is Users_det_table
module.exports=userdetailsdb;