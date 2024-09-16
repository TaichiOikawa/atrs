import * as express from "express";
import { jwtHelper } from "../../modules/jwtHelper";

const verifyRouter: express.Router = express.Router();

verifyRouter.get("/", async (req, res, next) => {
  await jwtHelper.apiVerifyToken(req, res, next);
  if (res.headersSent) return;
  res.json({
    isAuthenticated: res.locals.isAuthenticated,
    userInfo: res.locals.userInfo,
  });
});

export default verifyRouter;
