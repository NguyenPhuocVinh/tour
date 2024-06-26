import { StatusCodes } from 'http-status-codes';

const errorHandle = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later'
    }

    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message).join(', ');
    }

    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
}

export default errorHandle;
