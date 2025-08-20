import { Router } from 'express';
import ExplainRouter from './explain';
import userRouter from './user';



export const rootRouter = Router();
rootRouter.use("/",ExplainRouter);
rootRouter.use("/auth" , userRouter)
