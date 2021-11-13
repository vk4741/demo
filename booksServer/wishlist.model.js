var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Whishlistschema = new Schema({
    username : String,
    bookid : Number
})

module.exports = mongoose.model('Wishlist',Whishlistschema)