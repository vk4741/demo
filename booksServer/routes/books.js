const router = require('express').Router()
var Book = require('../Book.model')

router.get('/getbooks',(req,res)=>{
    Book.find({},(err,Books)=>{
        if(err){
            res.send("error had occured")
        }
        else{
            res.json(Books)
        }
    })
})

router.get('/getbook/:id',(req,res)=>{
    Book.findOne({_id:req.params.id},(err,book)=>{
        if(err){
            res.send("error had occured")
        }
        else{
            res.json(book)
        }
    })
})

router.get('/getbookusername/:username',(req,res)=>{
    Book.find({username:req.params.username},(err,books)=>{
        if(err){
            res.send("error had occured"+err)
        }
        else{
            res.json(books)
        }
    })
})

router.post('/addbook',(req,res)=>{
    var newBook = new Book({
        _id: req.body._id,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        isRented: req.body.isRented,
        username: req.body.username
    })
    
    newBook.save((err,book)=>{
        if(err){
            res.send("error in adding book")
        }
        else{
            res.json(book)
        }
    })
})

router.put('/updatebook/:id',(req,res)=>{
    Book.findOneAndUpdate({_id:req.params.id},{$set:{title: req.body.title}},(err,book)=>{
        if(err){
            res.send("error in updating book")
        }
        else{
            res.json(book)
        }
    })
})

router.put('/rentbook/:id',(req,res)=>{
    Book.findOneAndUpdate({_id:req.params.id},{$set:{isRented: req.body.isRented,username: req.body.username}},(err,book)=>{
        if(err){
            res.send("error in updating book")
        }
        else{
            res.json(book)
        }
    })
})

router.delete('/deletebook/:id',(req,res)=>{
    Book.findOneAndRemove({_id:req.params.id},(err,book)=>{
        if(err){
            res.send("error in deleting book")
        }
        else{
            res.json(book)
        }
    })
})
module.exports = router