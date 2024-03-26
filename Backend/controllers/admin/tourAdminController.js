import Tour from "../../db/models/Tour.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import cloudinary from "../../utils/cloudinary.js"
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        fs.mkdirSync(uploadDir, { recursive: true }); 
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

const uploadSingle = upload.single('image');

const createTour = async (req, res) => {
    uploadSingle(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Error uploading file" });
        }

        const { tourName, departureDate, price, size, address, feature, description } = req.body;
        const { path: imagePath } = req.file; 

        try {
            if (!tourName || !departureDate || !price || !size || !address || !feature || !description || !imagePath) {
                throw new BadRequestError("Please provide all required fields and ensure departureDate is a valid date");
            }

            const uploadedResponse = await cloudinary.uploader.upload(imagePath, {
                folder: "tour-images",
            });

            if (!uploadedResponse || !uploadedResponse.url) {
                throw new InternalServerError("Failed to upload image to Cloudinary");
            }

            const tour = new Tour({
                tourName,
                departureDate,
                price,
                size,
                address,
                imagePath: uploadedResponse.url,
                feature,
                description,
            });

            const savedTour = await tour.save();

            res.status(StatusCodes.CREATED).json({ savedTour });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        }
    });
};


const updateTour = async (req, res) => {
    const { _id } = req.params;
    const { newImage, ...updateFields } = req.body; 

    try {
        const tour = await Tour.findById(_id);

        if (!tour) {
            throw new NotFoundError(`Tour with id ${_id} not found`);
        }

        if (newImage) {
            if (tour.imagePath) {
                const public_id = tour.imagePath.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(public_id);
            }

            const uploadedResponse = await cloudinary.uploader.upload(newImage, {
                folder: "tour-images",
            });

            if (!uploadedResponse || !uploadedResponse.url) {
            }

            tour.imagePath = uploadedResponse.url;
        }

        tour.tourName = updateFields.tourName || tour.tourName;
        tour.departureDate = updateFields.departureDate || tour.departureDate;
        tour.price = updateFields.price || tour.price;
        tour.size = updateFields.size || tour.size;
        tour.address = updateFields.address || tour.address;
        tour.feature = updateFields.feature || tour.feature;
        tour.description = updateFields.description || tour.description;

        const updatedTour = await tour.save();

        res.status(StatusCodes.OK).json({ updatedTour });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};




const deleteTour = async (req, res) => {
    const { _id } = req.params;

    try {
        const tour = await Tour.findByIdAndDelete({ _id });

        if (!tour) {
            throw new NotFoundError(`Tour with id ${_id} not found`);
        }

        res.status(StatusCodes.OK).json({ tour });
    } catch (error) {
        console.error(error);
        throw new BadRequestError("Invalid data");
    }
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

export { createTour, updateTour, deleteTour, getAllTour };
