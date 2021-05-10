const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');


// add methods here 

//login

router.post('/login', async (req,res) => {

 
     
    const emailExitst = await User.findOne({email:req.body.email})

   if(!emailExitst) return res.json({message:"email or password invalid"});

   //passwordcheck

   const validpass = await bcript.compareSync(req.body.password,emailExitst.password)

   if(!validpass) return res.json({message: "invalid username or password"})
   
  //token create
  const token = jwt.sign({_id: emailExitst._id},process.env.TOKEN_SECRET)



  return res.json({message: "successfully login",Token:token,IsAdmin:emailExitst.IsAdmin,UserId:emailExitst._id})

});


module.exports = router