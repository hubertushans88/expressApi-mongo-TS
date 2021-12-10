import { CorsOptions } from "cors";

export const corsOptions = ( whitelist: string | string[] = "*" ): CorsOptions => {
    return {
        origin: (origin, callback) => {
            if( typeof whitelist !== "string" ){
                if (whitelist.indexOf(<string>origin) !== -1) callback(null, true); else callback(null, false);
            }else{
                if( whitelist === origin || whitelist === "*" ) callback(null, true);
                else callback(null, true);
            }
        },
        preflightContinue: true,
        methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
    }
};
