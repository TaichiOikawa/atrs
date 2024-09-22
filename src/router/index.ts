import * as express from "express";
import { jwtHelper } from "../modules/jwtHelper";
import apiRouter from "./api";
import authRouter from "./auth";

const router: express.Router = express.Router();

router.use(
  "/api",
  async (req, res, next) => {
    await jwtHelper.apiVerifyToken(req, res, next);
  },
  apiRouter
);
router.use("/auth", authRouter);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;