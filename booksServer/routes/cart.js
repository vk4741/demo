const router = require('express').Router()
var Cart = require('../cart.model')
const auth = require("../middleware/auth");

router.get('/getcart/:username', auth ,(req,res)=>{
    Cart.find({username:req.params.username},(err,cart)=>{
        if(err){
            res.send("error had occured"+err)
        }
        else{
            res.json(cart)
        }
    })
})

router.post('/addcart', auth ,(req,res)=>{
    var newCart = new Cart({
        username : req.body.username,
        bookid : req.body.bookid
    })
    
    newCart.save((err,cart)=>{
        if(err){
            res.send("error in adding to cart" + err)
        }
        else{
            res.json(cart)
        }
    })
})


router.delete('/removefromcart/:id',auth ,(req,res)=>{
    Cart.findOneAndDelete({_id:req.params.id},(err)=>{
        if(err) {
            res.send({message:'Error in deleting book from the cart'})
        }
        else {
            res.send({message:'Deleted book from cart'})
        }
    })
})


module.exports = router