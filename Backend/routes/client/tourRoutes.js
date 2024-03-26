

import express from "express";
const router = express.Router();

import { getSingleTour, getAllTour, searchTour, getFeaturedTour, getTourCount } from '../../controllers/client/tourController.js';


router.route("/search").get(searchTour);
router.route("/featured").get(getFeaturedTour);

router.route("/:_id").get(getSingleTour);
router.route("/").get(getAllTour);
router.route("/search/getTourCount").get(getTourCount);
export default router;
