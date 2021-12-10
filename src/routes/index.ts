import express from 'express';
import helmet from 'helmet';
import testRoute from "./test.route";

const Router = express.Router();

const routes=[
    {
        path: '',
        version: "1",
        router: testRoute
    }
]

routes.forEach((route)=>{
    Router.use(`/v${route.version}/${route.path}`, route.router);
})

export default Router;
