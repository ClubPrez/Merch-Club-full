import { Router, type IRouter } from "express";
import healthRouter from "./health";
import mockupsRouter from "./mockups";

const router: IRouter = Router();

router.use(healthRouter);
router.use(mockupsRouter);

export default router;
