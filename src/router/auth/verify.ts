import * as express from "express";
import { jwtHelper } from "../../modules/jwtHelper";

const verifyRouter: express.Router = express.Router();

verifyRouter.get("/", (req, res, next) => {
  jwtHelper.apiVerifyToken(req, res, next);
  res.json({ isAuthenticated: res.locals.isAuthenticated });
});

export default verifyRouter;
