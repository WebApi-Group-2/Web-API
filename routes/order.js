const express = require('express');
const order = require('../models/order');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Order = require('../models/order');
const verifytoken = require('../tokenVerify');



router.post('/add', verifytoken,async (req,res) => {
    
    const token = req.body.Token;
    const verify = jwt.verify(token,process.env.TOKEN_SECRET);
     
    const order = new Order ({
        userId : verify._id,
        TotalAmount : req.body.TotalAmount,
        itemdetails: req.body.itemdetails,
        AddressShiping: req.body.AddressShiping,
      
    })

   try{
   const savedone = await order.save()
    
   res.status(200).json(savedone);

   
   

    
   } catch(err) {

       res.status(404).json({message: err});
   }


  
    
   
});


router.get('/getorders' ,async (req,res) => {

    const token = req.query.token;
    
 
    
        try{
            const verify = jwt.verify(token,process.env.TOKEN_SECRET);

            const order = await Order.find({userId:verify._id});
            res.status(200).json(order)
    
        }catch(err){
            res.status(404).json({message:err})
        }
    

    
     
    
   
});


router.get('/getselectedorder' ,async (req,res) => {

    const token = req.query.token;
    const OrderId = req.query.orderid;
 
    
        try{
            const verify = jwt.verify(token,process.env.TOKEN_SECRET);

            const order = await Order.find({_id: OrderId});
            res.status(200).json(order)
    
        }catch(err){
            res.status(404).json({message:err})
        }
    
     
    
   
});



router.get('/getitemqty' ,async (req,res) => {

    const token = req.query.token;
    const itemid = req.query.itemid;
 
    
        try{
            const verify = jwt.verify(token,process.env.TOKEN_SECRET);

            const order = await Order.find({"itemdetails._id": itemid}).sort({AddressShiping:"asc"}).select({itemdetails:1});
           
            res.status(200).json(order)
    
        }catch(err){
            res.status(404).json({message:err})
        }


       
    
     
    
   
});

router.put('/updateaddress/:id', verifytoken,async (req,res) => {

    let id = req.params.id;

    try{
        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({message:"Cannot find this order"})
        }
    
        order.set({AddressShiping: req.body.AddressShiping});
        order.save();
        return res.status(200).json(order);

    }catch(err)
    {
        return res.status(404).json({message:"something went wrong"});
    }

   


});



router.put('/updateitemqty/:id', verifytoken,async (req,res) => {

    let id = req.params.id;

   let order = Order.findOne({"itemdetails._id": id}).then(doc => {
        item = doc.itemdetails.id(id);
        item["qty"] = req.body.qty;
       
       
        doc.save();
      
        //sent respnse to client
      }).catch(err => {
        console.log('Oh! Dark')
      });
    return res.status(200).json({message: "UpdateSuccess"});


});

module.exports = router