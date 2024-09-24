import * as express from "express";
import path from "path";
import { jwtHelper } from "../modules/jwtHelper";
import apiRouter from "./api";
import authRouter from "./auth";

const router: express.Router = express.Router();

router.use(express.static(path.join(__dirname, "..", "build")));
router.use(
  "/api",
  async (req, res, next) => {
    await jwtHelper.apiVerifyToken(req, res, next);
  },
  apiRouter
);
router.use("/auth", authRouter);
router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

export default router;
