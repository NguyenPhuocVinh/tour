import express from 'express';
const router = express.Router();

import { createBooking, getBookings, getBookingById } from '../../controllers/client/bookingController.js';
import auth from '../../middleware/client/auth.js';

router.route('/createbooking').post(createBooking, auth);
router.route('/getbooking').get(getBookings, auth);
router.route('/:bookingId').get(getBookingById, auth);

export default router;