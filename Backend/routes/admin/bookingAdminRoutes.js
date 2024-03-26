import express from 'express';
const router = express.Router();

import getAllBooking from '../../controllers/admin/bookingAdminController.js';
import authenticateUser from "../../middleware/client/auth.js";
import isAdmin from "../../middleware/admin/isAdmin.js";


router.route('/getallbooking').get(getAllBooking, authenticateUser, isAdmin);

export default router;