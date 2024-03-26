import express from "express";
const router = express.Router();

import isAdmin from "../../middleware/admin/isAdmin.js";
import authenticateUser from "../../middleware/client/auth.js";
import {createTour, updateTour, deleteTour, getAllTour} from "../../controllers/admin/tourAdminController.js";

router.route("/createtour").post(authenticateUser, isAdmin, createTour);
router.route("/updatetour/:_id").put(authenticateUser, isAdmin, updateTour);
router.route("/deletetour/:_id").delete(authenticateUser, isAdmin, deleteTour);
router.route("/getalltour").get(authenticateUser, isAdmin, getAllTour);
export default router;