var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookSchema = new Schema({
    _id : Number,
    title: String,
    author: String,
    category: String,
    isRented : Boolean,
    username : String,
})

module.exports = mongoose.model('Book',BookSchema)