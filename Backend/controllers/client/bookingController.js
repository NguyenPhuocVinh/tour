import Booking from "../../db/models/Booking.js";
import Tour from "../../db/models/Tour.js";
import User from "../../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../../errors/index.js";
import jwt from "jsonwebtoken";

const createBooking = async (req, res) => {
  try {
    const tourId = req.query.tourId;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      throw new BadRequestError("Tour not found");
    }

    const { fullName, email, phone, quantity, totalAmount } = req.body;
    
      let user;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findById(payload.userId);
      }

      if (user) {
        const newBooking = await Booking.create({
          tourId,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          departureDate: tour.departureDate,
          quantity,
          totalAmount,
          userId: user._id,
        });
        if (!newBooking) {
          throw new BadRequestError("Booking failed");
        }

        tour.size -= quantity;
        await tour.save();

        return res.status(StatusCodes.CREATED).json({ newBooking });
      } else {
        const randomString = Math.random().toString(36).substring(2, 15);
        const domain = "example.com";
        const emailRandom = randomString + "@" + domain;

        const randomPassword = Math.random().toString(36).substring(2, 15);
        const newUser = await User.create({
          email: emailRandom,
          password: randomPassword,
          phone,
          role: "guest",
        });

        if (!newUser) {
          throw new BadRequestError("User creation failed");
        }

        const newBooking = await Booking.create({
          tourId,
          fullName,
          email: email,
          phone,
          departureDate: tour.departureDate,
          quantity,
          totalAmount,
          userId: newUser._id,
        });

        if (!newBooking) {
          throw new BadRequestError("Booking failed");
        }

        tour.size -= quantity;
        await tour.save();

        return res.status(StatusCodes.CREATED).json({ newBooking, newUser });
      }
    
  } catch (error) {
    throw new BadRequestError("Error creating booking");
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("tour")
      .populate("user");

    res.status(StatusCodes.OK).json({ bookings });
  } catch (error) {
    console.error(error);
    throw new BadRequestError("Error getting bookings");
  }
};

const getBookingById = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Booking not found" });
    }

    res.status(StatusCodes.OK).json({ booking });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error getting booking" });
  }
};

export { createBooking, getBookings, getBookingById };
