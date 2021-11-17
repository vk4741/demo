var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Cartschema = new Schema({
    username : String,
    bookid : String
})

module.exports = mongoose.model('Cart',Cartschema)