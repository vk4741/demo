var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Whishlistschema = new Schema({
    username : String,
    bookid : String
})

module.exports = mongoose.model('Wishlist',Whishlistschema)