import { UnAuthenticatedError } from "../../errors/index.js";
import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (payload.role === 'admin') {
                return next();
            } else {
                throw new UnAuthenticatedError('Not an admin');
            }
        } catch (error) {
            next(error);
        }
    } else {
        throw new UnAuthenticatedError('Missing or invalid authorization header');
    }
};

export default isAdmin;
