import { Router } from "express";
import { getIO } from "../socket";

const socketRouter = Router();

socketRouter.post("/", (req, res) => {
  const message = req.body.message;
  console.log("socket", message);
  const io = getIO();
  io.emit("message", message);
  res.send("socket");
});

export default socketRouter;
