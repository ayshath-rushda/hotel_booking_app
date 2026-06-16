import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { createError } from "../util/error.js";

export const createBooking = async (req, res, next) => {
    const { hotelId, roomId, roomNumbers, dateRange, price } = req.body;
    const userId = req.user.id;

    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (nights < 1) {
        return next(createError(400, "Stay must be at least 1 night"));
    }

    try {
        const room = await Room.findById(roomId);
        if (!room) return next(createError(404, "Room not found"));

        for (const num of roomNumbers) {
            const roomNum = room.roomNumbers.find((rn) => rn.number === num);
            if (!roomNum) return next(createError(404, `Room number ${num} not found`));

            const isUnavailable = roomNum.unavailableDates.some((d) => {
                const dTime = new Date(d).getTime();
                return dTime >= start.getTime() && dTime <= end.getTime();
            });
            if (isUnavailable) {
                return next(createError(400, `Room number ${num} is not available for selected dates`));
            }
        }

        const totalPrice = price * nights;

        const booking = new Booking({
            hotelId,
            roomId,
            userId,
            roomNumbers,
            dateRange: { startDate: start, endDate: end },
            price: totalPrice,
            status: "confirmed",
        });

        const savedBooking = await booking.save();

        await Room.findByIdAndUpdate(roomId, {
            $push: {
                "roomNumbers.$[elem].unavailableDates": { $each: getDateRange(start, end) }
            }
        }, {
            arrayFilters: [{ "elem.number": { $in: roomNumbers } }]
        });

        res.status(200).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

function getDateRange(start, end) {
    const dates = [];
    let current = new Date(start);
    while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

export const getUserBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id })
            .populate("hotelId", "name city")
            .populate("roomId", "title")
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate("hotelId", "name city")
            .populate("roomId", "title")
            .populate("userId", "username email")
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

export const updateBookingStatus = async (req, res, next) => {
    try {
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: { status: req.body.status } },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};
