const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
//connect.db
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
console.log("connected to DB"));





//import routes
const authRoute = require('./routes/auth');


//Route middleware
app.use('/api/user', authRoute);


app.listen(3000, console.log("server up and running"));