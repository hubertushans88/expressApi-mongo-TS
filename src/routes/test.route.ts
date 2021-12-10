import express from 'express';
import {testController} from "../controllers";

const router = express.Router();

router.get("/test", testController.helloWorld);
router.get("/error", testController.returnError);

export default router;
