import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controller/room.js";
import { verifyAdmin } from "../util/verifyToken.js";

const router = express.Router();

//create Room
router.post("/:hotelid", verifyAdmin, createRoom);

//update Room
router.put("/:id", verifyAdmin, updateRoom);

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);


//get all
router.get("/", getRooms);

export default router