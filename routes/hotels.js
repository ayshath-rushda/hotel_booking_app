import express from "express";
import Hotel from "../models/Hotel.js"; 
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controller/hotel.js";

const router = express.Router();

//create hotel
router.post("/",createHotel);

//update hotel
router.put("/:id", updateHotel);

//delete
router.delete("/:id",deleteHotel);

//get
router.get("/:id", getHotel);


//get all
router.get("/", getHotels);

export default router