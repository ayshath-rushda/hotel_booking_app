import express from "express";
import Hotel from "../models/Hotel.js"; 
import { createError } from "../util/error.js";

const router = express.Router();

//create hotel
router.post("/", async (req,res)=>{
   
    const newHotel = new Hotel(req.body)
   
   
    try{
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)

    }catch(err){
        res.status(500).json(err)
    }    


});

//update hotel
router.put("/:id", async (req,res)=>{
   
   
    try{
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {returnDocument:"after",
                runValidators:true
            }
        );
        res.status(200).json(updatedHotel)

    }catch(err){
        res.status(500).json(err)
    }    


});

//delete
router.delete("/:id", async (req,res)=>{
    try{
        await Hotel.findByIdAndDelete(
            req.params.id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json("hotel has been deleted")

    }catch(err){
        res.status(500).json(err)
    }    
});

//get
router.get("/:id", async (req,res)=>{
    try{
        const hotel=await Hotel.findById(req.params.id);
        res.status(200).json(hotel);

    }catch(err){
        res.status(500).json(err)
    }    
});


//get all
router.get("/", async (req,res,next)=>{
    
    

    try{
        const hotels=await Hotel.find();
        res.status(200).json(hotels)

    }catch(err){
        next(err)
    }    
});

export default router