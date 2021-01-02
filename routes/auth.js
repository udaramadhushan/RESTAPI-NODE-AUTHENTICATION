const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require("../validation");





router.post('/register', async(req,res)=>{

    //validation of the request
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //check if user is already in the DB
    const emailExist = await  User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exists')


    const user =  new User({

        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{

            const savedUser = await user.save();
            res.send(savedUser);
}
    catch(err){
        res.status(400).send(err);
}
})


router.post('/login')




module.exports = router;
