import express from "express";
import { createUserHandler } from "../controller/usersController";

const userRouter = express.Router()

userRouter.route('/create/user/').post(createUserHandler)

export default userRouter;
