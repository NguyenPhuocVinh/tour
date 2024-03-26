import mongoose from "mongoose";

const paySchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    bookingId: {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    amountTranstion: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date
    }
});

export default mongoose.model("Pay", paySchema);
