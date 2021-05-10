const express = require('express');
const { verify } = require('jsonwebtoken');

const router = express.Router();
const categoryModel = require('../models/category');
const verifytoken = require('../tokenVerify')

router.get("/getall",async (req,res)=>{
    try{
        let categories= await categoryModel.find();
        res.json(categories);
    }catch(ex){
        return res.status(500).send("error",ex.message);
    }
    
});

router.post('/add',async (req,res) => {
     
    let categoryData = new categoryModel({
        name:req.body.name,
        catId:req.body.catId,
        description:req.body.description,
        
    })

   try{
    categoryData = await categoryData.save();
    
   res.json(categoryData);
   } catch(err) {

       res.json({message: err});
   }


   
});

router.put("/:id",async (req,res)=>{
    let reqID=req.params.id
    let item= await categoryModel.findByIdAndUpdate(reqID,{
        name:req.body.name,
        catId:req.body.catId,
        description:req.body.description,
    });

    if(!item){
        return res.status(404).send("no such Item")
    }
    // avenger.set({likeCount: req.body.likeCount});
    // avenger=await avenger.save();
    return res.send("Item updated successfully");

});


router.get("/find",async(req,res)=>{
    
    let reqID=req.body.id
    let category=categoryModel.find({_id: reqID});
    
    if(!category){
        return res.status(404).send("No such item")
    }
    res.json(category)

  
});

router.delete("/:id",async(req,res)=>{
    let reqID=req.params.id
    let category=await categoryModel.findByIdAndDelete(reqID);
    if(!category){
        return res.status(404).json("no such item")
    }
    // let indexofitem=itemModel.indexOf(item);
    // itemModel.splice(indexofitem,1);

    res.json(category);

});


module.exports = router