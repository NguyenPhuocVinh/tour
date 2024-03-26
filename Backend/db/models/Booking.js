import mongoose from "mongoose";
import validator from "validator";

const bookingSchema = mongoose.Schema({
    tourId: {
        type: mongoose.Types.ObjectId,
        ref: "Tour",
        required: true
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    fullName: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },

    phone: {
        type: String,
        required: [true, "Please provide phone number"],
        validate: {
            validator: function(value) {
                return /^0[0-9]{9}$/.test(value);
            },
            message: "Invalid phone number format. Please enter a valid Vietnamese phone number."
        }
    },

    departureDate: {
        type: Date,
    },

    dateCreate: {
        type: Date,
        default: Date.now(),
        get: function(timestamp) {
            const options = {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'Asia/Ho_Chi_Minh'
            };
            return new Date(timestamp).toLocaleString('vi-VN', options);
        }
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value > 0;
            },
            message: "Quantity must be a positive integer"
        }
    },
    totalAmount: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value > 0;
            },
            message: "Total price must be a positive integer"
        }
    },
    paymentStatus: {
        type: String,
        enum: ["Chưa thanh toán", "Đã thanh toán", "Hủy"],
        default: "Chưa thanh toán"
    },
    review: {
        type: String,
        maxlength: [500, "Review must be at most 500 characters"]
    },
});

export default mongoose.model("Booking", bookingSchema);