import { Router, type IRouter } from "express";
import healthRouter from "./health";
import subscribeRouter from "./subscribe";
import searchRouter from "./search";

const router: IRouter = Router();

router.use(healthRouter);
router.use(subscribeRouter);
router.use(searchRouter);

export default router;
