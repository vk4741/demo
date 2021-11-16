const router = require('express').Router()
var Whishlist = require('../wishlist.model')
const auth = require("../middleware/auth");

router.get('/getwishlist/:username',auth,(req,res)=>{
    Whishlist.find({username:req.params.username},(err,wishlist)=>{
        if(err){
            res.send("error had occured"+err)
        }
        else{
            res.json(wishlist)
        }
    })
})

router.post('/addwhishlist',auth,(req,res)=>{
    var newWsihlist = new Whishlist({
        username : req.body.username,
        bookid : req.body.bookid
    })
    
    newWsihlist.save((err,wishlist)=>{
        if(err){
            res.send("error in adding to wishlist" + err)
        }
        else{
            res.json(wishlist)
        }
    })
})

router.delete('/removefromwishlist/:id',auth,(req,res)=>{
    Whishlist.findOneAndDelete({_id:req.params.id},(err)=>{
        if(err) {
            res.send({message:'Error in removing book from the wishlist'})
        }
        else {
            res.send({message:'Removed book from wishlist'})
        }
    })
})


module.exports = router