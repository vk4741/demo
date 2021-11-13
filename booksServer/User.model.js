var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    _id : String,
    name : String,
    password: String,
    email : String
})

module.exports = mongoose.model('User',UserSchema)