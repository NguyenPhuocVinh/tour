import User from "../../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/index.js";
import Booking from "../../db/models/Booking.js";
import Tour from "../../db/models/Tour.js";
import Pay from "../../db/models/Pay.js";

const getLogin = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    throw new ForbiddenError("Access denied. You are not logged in.");
  }

  try {
    const user = await User.findById(userId, "fullName email phone");

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getHistoryBooking = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    throw new ForbiddenError("Access denied. You are not logged in.");
  }

  try {
    const bookings = await Booking.find({ userId: userId })
      .populate({ path: "tourId", select: "tourName imagePath" })
      .sort({ dateCreate: -1 });

    const historyBookings = [];
    for (const booking of bookings) {
      const payInfo = await Pay.findOne({ bookingId: booking._id });
      const historyBooking = {
        _id: booking._id,
        tourName: booking.tourId.tourName,
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        departureDate: booking.departureDate,
        dateCreate: booking.dateCreate,
        quantity: booking.quantity,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        tourImage: booking.tourId.imagePath
      };
      historyBookings.push(historyBooking);
    }

    res.status(StatusCodes.OK).json({ historyBookings });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};


export { getLogin, getHistoryBooking };
