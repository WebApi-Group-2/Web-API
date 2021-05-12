const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');


// add methods here 

//Registration

router.post('/register',async (req,res) => {

    //check user already exits
 
    const emailExitst = await User.findOne({email:req.body.email})
 
    if(emailExitst) return res.status(400).json({message:"email already exits"})
     
     //password hash
     const bcri = await bcript.genSalt(10);
     const hashpassword = await bcript.hashSync(req.body.password,bcri);
 
     const user = new User({
         name : req.body.name,
         email : req.body.email,
         IsAdmin: req.body.IsAdmin,
         password : hashpassword
     });
      
     try {
         const saveduser = await user.save()
         res.json(saveduser);
 
     }catch(err) {
         res.status(400).json(err);
     }
    
    
 
 });

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


router.put("/psw_reset/:id", async(req, res) =>{
  console.log("accesseed succeesews")
  let reqID = req.params.id
  let user = await User.findByIdAndUpdate(reqID,{
    password:req.body.password
    
  })

  

  if(!user){
    return res.status(404).send("no such Item")
}
return res.send("Item updated successfully");

});

module.exports = router