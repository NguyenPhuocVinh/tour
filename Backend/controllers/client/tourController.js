import Tour from '../../db/models/Tour.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../../errors/index.js';

const getSingleTour = async (req, res) => {
    const { _id } = req.params; 
    console.log(_id);
    
    const tour = await Tour.findById(_id);
    
    if (!tour) {
        throw new NotFoundError(`No tour with id ${_id}`);
    }

    console.log(tour.imagePath);
    res.status(StatusCodes.OK).json({ tour });
};

const getAllTour = async (req, res) => {
    try {
        const tours = await Tour.find({});

        if (!tours || tours.length === 0) {
            throw new NotFoundError("No tours");
        }

        res.status(StatusCodes.OK).json({ tours });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const searchTour = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid keyword' });
        }
        const tours = await Tour.find({ address: { $regex: keyword, $options: 'i' } });
        if (!tours || tours.length === 0) {
            throw new NotFoundError(`No tours`);
        }
        res.status(StatusCodes.OK).json({ tours });
    } catch (error) {
        res
    }
};





const getFeaturedTour = async (req, res) => {
    const tours = await Tour.find({ feature: true }).limit(8);
    if (!tours || tours.length === 0) {
        throw new NotFoundError(`No featured tour`);
    }
    res.status(StatusCodes.OK).json({ tours });
};

const getTourCount = async (req, res) => {
    try{
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({success: true, data: tourCount});
    }catch(error){
        res.status(500).json({success: false, message: "Failed"});
    }
}


export { getSingleTour, getAllTour, searchTour, getFeaturedTour, getTourCount };
