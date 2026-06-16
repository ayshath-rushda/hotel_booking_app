import express from "express";
import { createBooking, getUserBookings, getAllBookings, updateBookingStatus } from "../controller/booking.js";
import { verifyToken, verifyAdmin } from "../util/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getUserBookings);
router.get("/all", verifyAdmin, getAllBookings);
router.put("/:id", verifyAdmin, updateBookingStatus);

export default router;
