const router = require('express').Router()
var User = require('../User.model')

router.get('/getusers',(req,res)=>{
    User.find({},(err,Users)=>{
        if(err){
            res.send("error had occured")
        }
        else{
            res.json(Users)
        }
    })
})

router.get('/getuser/:id',(req,res)=>{
    User.findOne({_id:req.params.id},(err,user)=>{
        if(err){
            res.send("error had occured")
        }
        else{
            res.json(user)
        }
    })
})

router.post('/adduser',(req,res)=>{
    var newUser = new User({
        _id: req.body._id,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
    
    newUser.save((err,user)=>{
        if(err){
            res.send("error in adding user" + err)
        }
        else{
            res.json(user)
        }
    })
})


module.exports = router