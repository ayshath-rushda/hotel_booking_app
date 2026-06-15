import express from "express";
import Hotel from "../models/Hotel.js";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel,countByType } from "../controller/hotel.js";
import { verifyAdmin } from "../util/verifyToken.js"
const router = express.Router();

//create hotel
router.post("/", verifyAdmin, createHotel);

//update hotel
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/find/:id", getHotel);


//get all
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router