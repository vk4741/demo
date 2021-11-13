var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const dotEnv = require('dotenv')
dotEnv.config()

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/wishlists',require('./routes/wishlist'))
app.use('/books',require('./routes/books'))
app.use('/users',require('./routes/user'))

app.listen(process.env.PORT,()=>{
    console.log("Server listening to " + process.env.PORT)
})