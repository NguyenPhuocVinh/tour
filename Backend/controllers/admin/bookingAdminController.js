import Booking from '../../db/models/Booking.js';
import Tour from '../../db/models/Tour.js';
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/index.js";

const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({}); 
        const bookingsWithTourNames = await Promise.all(bookings.map(async (booking) => {
            const tour = await Tour.findById(booking.tourId);
            const tourName = tour ? tour.tourName : null;
            return {
                ...booking.toObject(),
                tourName
            };
        }));

        if (!bookings || bookings.length === 0) {
            throw new NotFoundError("No bookings found");
        }
        res.status(StatusCodes.OK).json({ bookings: bookingsWithTourNames });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export default getAllBooking;
