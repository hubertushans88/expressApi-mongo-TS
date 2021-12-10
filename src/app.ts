"use strict";

import express from "express";
import cors from "cors";
import compression from "compression";
import config from "./config/config";
import {corsOptions} from "./config/cors";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import {errorConverter, errorHandler} from "./middlewares/error.middleware";
import helmet from "helmet";
import Router from './routes';


const app = express();

app.set("env", config.env);

// Apply global middlewares
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions("*")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allow preflight request
app.options("*", (req, res)=>{
    res.status(200).json({});
});

// Bind Routes
app.use("/", Router);

// Allow reverse proxy
app.set("trust proxy", true);

// Handle unmatched routes
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Handle Stack Trace
app.use(errorConverter);
app.use(errorHandler);

export default app;
