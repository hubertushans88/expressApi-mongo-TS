"use strict";

import app from "./app";
import {connect} from "./config/database";
import logger from "./utils/logger";
import config from "./config/config";

const server = app.listen(config.port, async()=>{
    console.log(
        "  App is running at http://localhost:%s in %s mode",
        config.port,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");

    await connect();
});

/**
 * Exit Handlers.
 */

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: any) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

export default server;
