import User from "../../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/index.js";

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}); 

        if (!users || users.length === 0) {
            throw new NotFoundError("No users found");
        }

        res.status(StatusCodes.OK).json({ users });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export default getAllUser;
