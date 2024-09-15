import * as express from "express";
import loginRouter from "./login";
import logoutRouter from "./logout";
import signupRouter from "./signup";
import verifyRouter from "./verify";

const authRouter: express.Router = express.Router();

authRouter.use("/login", loginRouter);
authRouter.use("/logout", logoutRouter);
authRouter.use("/signup", signupRouter);
authRouter.use("/verify", verifyRouter);

export default authRouter;
