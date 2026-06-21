import { Router, type IRouter } from "express";
import healthRouter from "./health";
import subscribeRouter from "./subscribe";
import searchRouter from "./search";
import productRouter from "./product";
import quoteDataRouter from "./quote-data";
import imageRouter from "./image";

const router: IRouter = Router();

router.use(healthRouter);
router.use(subscribeRouter);
router.use(searchRouter);
router.use(productRouter);
router.use(quoteDataRouter);
router.use(imageRouter);

export default router;
