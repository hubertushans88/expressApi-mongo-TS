import Joi from "joi";
import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.join(__dirname, "../../.env")});

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().default("development"),
    PORT: Joi.string().default("5000"),
    MONGO_USERNAME: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_HOST: Joi.string().required(),
    MONGO_DB: Joi.string().required(),
}).unknown();

const {value: envVars, error} = envVarsSchema.prefs({ errors: {label: 'key'}}).validate(process.env);
if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

type EnvConfig = {
    env: string,
    port:string,
    mongo:{
        url: string,
        options:{
            useNewUrlParser: boolean,
            useUnifiedTopology: boolean,
        }
    }
}

const config: EnvConfig={
    env: envVars?.NODE_ENV,
    port: envVars?.PORT,
    mongo:{
        url: `mongodb://${envVars?.MONGO_USERNAME}:${envVars?.MONGO_PASSWORD}@${envVars?.MONGO_HOST}/${envVars?.MONGO_DB}?authSource=admin`,
        options:{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
    }

}

export default config;
