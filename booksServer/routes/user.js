const router = require('express').Router()
var User = require('../User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config()
const auth = require("../middleware/auth");

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

router.post('/adduser',async(req,res)=>{
    var newUser = new User({
        _id: req.body._id,
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    })

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password,salt)

    const token = jwt.sign(
        { user_id: newUser._id},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );   

      newUser.token = token
    
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
    const validPassword = await bcrypt.compare(password,user.password)

    if(validPassword){

        const token = jwt.sign(
            { user_id: user._id},
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          user.token = token
        res.json(user)
    }
    else{
        res.json({message:"Invalid password"})
    }
 }
 catch{
    console.log('Invalid username or user does not exits')
    return res.json({message:"Invalid username user does not exits"})
    
 }
})

router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });



module.exports = router