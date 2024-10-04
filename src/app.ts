import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { AppDataSource } from "../data-source";
import corsOptions from "./config/front.config";
import router from "./router";
import { initializeSocket } from "./socket";
import { event } from "./socket/event";

const app: express.Express = express();
const httpServer = createServer(app);
const port = 3000;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

// Database init
AppDataSource.initialize()
  .then(() => {
    console.log("Data source initialized");
  })
  .catch((error) => {
    console.error("Data source initialization failed", error);
  });

// Socket.io init
initializeSocket(httpServer);
event();

require("./cron/activity");

httpServer.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
