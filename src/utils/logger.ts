import winston from "winston";
import config from "../config/config";

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: config.env === "production" ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
