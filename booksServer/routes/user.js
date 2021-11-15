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
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
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

router.post('/login',async(req,res)=>{
 try{
    const id = req.body.username
    const password =  req.body.password

    const user = await User.findOne({_id:id})
    
    if(user.password == password){
        res.json(user)
    }
    else{
        res.json({message:'invalid password'})
    }
 }
 catch{
    console.log('Invalid username or user does not exits')
    return res.status(200).json("Invalid_username")
    
 }
})


module.exports = router