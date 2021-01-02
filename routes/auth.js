const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require("../validation");
const bcrypt = require('bcryptjs');





router.post('/register', async(req,res)=>{

    //validation of the request
    const {error} = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    //check if user is already in the DB
    const emailExist = await  User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exists')
    

    //hash the password
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user =  new User({

        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{

            const savedUser = await user.save();
            res.send({user:user._id});
}
    catch(err){
        res.status(400).send(err);
}
})

//login
router.post('/login', async (req,res)=>{
         
    const {error} = loginValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);


    const user = await  User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('email or password is wrong');

    //password validation
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).send("email or password is wrong");
    

    res.send("logged in");





}) 




module.exports = router;
