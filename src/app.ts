import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { AppDataSource } from "../data-source";
import router from "./router";

const app: express.Express = express();
const port = 3000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

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

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
