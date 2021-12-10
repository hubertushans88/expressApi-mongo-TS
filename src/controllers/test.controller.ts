import express from "express";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import {sendResponse, catchAsync} from "../utils/api";

const helloWorld = catchAsync(async (req: express.Request, res: express.Response)=>{
    return sendResponse(res, {
            statusCode:httpStatus.OK,
            message:"Hello world",
            data:{
                data:"data are here"
            },
            success:true
    });
});

const returnError = catchAsync(async (req: express.Request, res:express.Response)=>{
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Something went wrong in our side");
});

export default {helloWorld, returnError};
