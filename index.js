const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//import routes
const authRoute = require('./routes/auth');

dotenv.config();
//connect.db
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
console.log("connected to DB"));



//Middleware
app.use(express.json());




//Route middleware
app.use('/api/user', authRoute);


app.listen(3000, console.log("server up and running"));