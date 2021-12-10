import {connect as mongoCon} from "mongoose";
import logger from "../utils/logger";
import config from "./config";

export async function connect(){
    if( process.env.NODE_ENV !== "production" ){
        logger.info("Running in dev mode!");
    }
    try {
        const connection = await mongoCon(config.mongo.url, config.mongo.options);
        logger.info("Database connected!");
        return connection;
    } catch (error) {
        logger.info("Database connection error!");
        console.log(error);
        process.exit(1);
    }
}

