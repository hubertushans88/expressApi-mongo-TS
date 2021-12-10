import express from 'express';
import httpStatus from 'http-status';
import logger from '../utils/logger';
import ApiError from "../utils/ApiError";

type ErrorResponse = ApiError;

const errorConverter = (err: ErrorResponse, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || httpStatus[statusCode];
        error = new ApiError(statusCode, String(message), false, err.stack);
    }
    next(error);
};

const errorHandler = (err: ErrorResponse, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = String(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === 'development') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

export {
    errorConverter,
    errorHandler
}
