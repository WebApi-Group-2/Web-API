const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config');
const cors = require('cors');
const bodyparser = require('body-parser');


app.use(bodyparser.json({
    limit: '5mb'
}));

//middleware
app.use(cors());


mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
  } ,() =>{
  
console.log('connected')

})


app.listen(5000);