const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect.db
mongoose.connect('mongodb+srv://udara:udara@users.yoj80.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useNewUrlParser: true },
console.log("connected to DB"));





//import routes
const authRoute = require('./routes/auth');


//Route middleware
app.use('/api/user', authRoute);


app.listen(3000, console.log("server up and running"));