import mongoose from "mongoose";
import validator from "validator";

const tourSchema = mongoose.Schema({
    tourName: {
        type: String,
        required: [true, "Please provide tour name"],
        unique: true
    },

    departureDate: {
        type: Date,
        required: [true, "Please provide departure date"]
    },

    price: {
        type: Number,
        required: [true, "Please provide price"],
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value > 0;
            },
            message: "Price must be a positive integer"
        }
    },
    size: {
        type: Number,
        required: [true, "Please provide size"],
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value > 0;
            },
            message: "Size must be a positive integer"
        }
    },
    address: {
        type: String,
        required: [true, "Please provide address"]
    },
    imagePath: {
        type: String,
        required: [true, "Please provide image path"],
        validate: {
            validator: function (value) {
                return /\.(jpg|jpeg|png|gif)$/.test(value.toLowerCase());
            },
            message: "Invalid image path"
        }
    },
    feature: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, "Please provide description"]
    }
})

export default mongoose.model("Tour", tourSchema);