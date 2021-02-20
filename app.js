const express = require('express');

const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify:true})
.then(()=>{
    console.log('mongoDB Connected...')
}).catch((err)=>{
    console.log(err)
})

//EJS 
app.use(expressLayouts);  
app.set('view engine','ejs');  

//Bodyparser
app.use(express.urlencoded({extended:false}))


//Routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));



