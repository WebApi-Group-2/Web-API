const express = require('express');
const { verify } = require('jsonwebtoken');

const router = express.Router();
const itemModel = require('../models/item');
const verifytoken = require('../tokenVerify')

router.get("/getall",async (req,res)=>{
    try{
        let items= await itemModel.find();
        res.json(items);
    }catch(ex){
        return res.status(500).json("error",ex.message);
    }
    
});

router.post('/add',async (req,res) => {

    
     
    let itemData = new itemModel({
        name:req.body.name,
        itemId:req.body.itemId,
        catID:req.body.catID,
        imageURL:req.body.imageURL,
        uPrice:req.body.uPrice,
        description:req.body.description,
        status:req.body.status,
        discount:req.body.discount,
        videoLink:req.body.videoLink
    })

   try{
    itemData = await itemData.save();
    
   res.json(itemData);
   } catch(err) {

       res.json({message: err});
   }


   
});



router.get("/:id",async(req,res)=>{
    
    let reqID=req.params.id
    try{
    let item=await itemModel.findById(reqID);
    
    if(!item){
        return res.status(404).send("No such Item")
    }
    res.send(item)
    }
    catch(err){
        return res.status(500).send("error",err.message);
    }
  
});

router.put("/:id",async (req,res)=>{
    let reqID=req.params.id
    let item= await itemModel.findByIdAndUpdate(reqID,{
        name:req.body.name,
        itemId:req.body.itemId,
        catID:req.body.catID,
        imageURL:req.body.imageURL,
        uPrice:req.body.uPrice,
        description:req.body.description,
        status:req.body.status,
        discount:req.body.discount,
        videoLink:req.body.videoLink
    });

    if(!item){
        return res.status(404).send("no such Item")
    }
    // avenger.set({likeCount: req.body.likeCount});
    // avenger=await avenger.save();
    return res.send("Item updated successfully");

});

router.delete("/:id",async(req,res)=>{
    let reqID=req.params.id
    let item=await itemModel.findByIdAndDelete(reqID);
    if(!item){
        return res.status(404).send("no such item")
    }
    // let indexofitem=itemModel.indexOf(item);
    // itemModel.splice(indexofitem,1);

    res.json(item);

});


router.get('/getenableitems' ,async (req,res) => {

    const status = req.query.status;
    
 
    
        try{
           

            const item = await itemModel.find({status:status});
            res.status(200).json(item)
    
        }catch(err){
            res.status(404).json({message:err})
        }
    
    
   
});

router.get('/getviewmoreitems' ,async (req,res) => {

    const id = req.query.id;
    
 
    
        try{
           
            if(id == "")
            {
                res.status(404).json({message:"Id is required"});
            }
            else
            {
                const item = await itemModel.find({_id:id});
                res.status(200).json(item)
            }
            
    
        }catch(err){
            res.status(500).json({message:err})
        }
    
    
   
});

router.get('/searchitems' ,async (req,res) => {

    const text = req.query.text;
    
 
    
        try{
           

            const item = await itemModel.find({$and:[{name:{ $regex: text, $options: "i" }}, {status:true} ]});
            res.status(200).json(item)
    
        }catch(err){
            res.status(500).json({message:err})
        }
    
    
   
});


module.exports = router