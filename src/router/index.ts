import * as express from "express";
import path from "path";
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

// Only Production
if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.join(__dirname, "..", "build")));
  router.use((req, res, next) => {
    if (req.path.startsWith("/socket.io")) {
      return next();
    }
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

export default router;
