import { Router } from "express";
import urlRouter from './urlRouter.js'
import userRouter from './userRouter.js'

const router = Router()

router.use('/url', urlRouter)
router.use('/user', userRouter)

export default router