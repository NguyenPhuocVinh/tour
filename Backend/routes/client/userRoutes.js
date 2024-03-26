import express from 'express';
const router = express.Router();

import { getLogin, getHistoryBooking} from '../../controllers/client/userController.js';
import auth from '../../middleware/client/auth.js';

router.route('/login').get(auth, getLogin);
router.route('/history_booking').get(auth, getHistoryBooking);

export default router;