import express from "express";

type ApiResponse = {
    statusCode?: number;
    message?: string;
    data?: any;
    success?: any;
}

export const sendResponse = (res: express.Response, data: ApiResponse)=>{
    const statusCode = data?.statusCode || 200;
    const message = data?.message || "";
    const success = data["success"] !== undefined ? data?.success : true;

    res.status(statusCode).json({
        success: success,
        message: message,
        data: data?.data
    })
}

export const catchAsync = (fn: Function) => (req: express.Request, res:express.Response, next:express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
