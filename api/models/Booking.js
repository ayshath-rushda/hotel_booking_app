import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roomNumbers: {
        type: [Number],
        required: true
    },
    dateRange: {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true }
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
