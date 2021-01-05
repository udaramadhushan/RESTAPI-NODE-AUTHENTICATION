const router = require('express').Router();
const verifytoken = require('./verifytoken');


router.get("/",verifytoken , (req,res)=>{

    res.json({posts: {title:"test post one", description:"test post one description"}});
})



module.exports =  router;
