import * as express from "express";
import path from "path";
import { jwtHelper } from "../modules/jwtHelper";
import apiRouter from "./api";
import authRouter from "./auth";
import socketRouter from "./socket";

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

router.use("/socket", socketRouter);

router.use((req, res, next) => {
  // socket.ioのパスにアクセスした場合は、index.htmlを返さない
  if (req.path.startsWith("/socket.io")) {
    return next();
  }
  console.log(req.path);
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

export default router;
