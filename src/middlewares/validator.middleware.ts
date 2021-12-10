import express from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiError from "../utils/ApiError";
import pick from "../utils/pick";

type SchemaAccept = {
    body?: Joi.Schema,
    query?: Joi.Schema,
    params?: Joi.Schema
}

const validator = (schema: SchemaAccept) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const validSchema = pick(schema, ['params', 'query', 'body']);
        const object = pick(req, Object.keys(validSchema));
        const { value, error } = Joi.compile(schema)
            .prefs({ errors: { label: 'key' } })
            .validate(object);

        if (error) {
            const errorMessage = error.details.map((details) => details.message).join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        Object.assign(req, value);
        return next();
    }
}

export default validator;
