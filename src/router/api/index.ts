import * as express from "express";

const apiRouter: express.Router = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("API root");
});

apiRouter.get("/activity", (req, res) => {
  const activity = {
    attendTime: "2024/09/12 12:00:00",
    leaveTime: "2024/09/12 18:00:00",
    weeklyTime: "3h 20min",
    totalTime: "10h 30min",
  };
  res.send(activity);
  console.log("GET /api/activity");
});

apiRouter.post("/attend", (req, res) => {
  const attendTime = req.body.attendTime;
  res.send(`Attend time: ${attendTime}`);
  console.log("POST /api/attend");
  console.log(req.body);
});

export default apiRouter;
