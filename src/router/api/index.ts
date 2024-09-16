import Router from "express-promise-router";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";

const apiRouter = Router();
const ActivityRepository = AppDataSource.getRepository(Activity);

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

apiRouter.post("/activity", async (req, res) => {
  if (!res.locals.userInfo) {
    res.status(401).send("Unauthorized");
    return;
  }
  if (!req.body.type || !["attend", "leave"].includes(req.body.type)) {
    res.status(400).send("Bad Request");
    return;
  }
  await ActivityRepository.insert({
    user: res.locals.userInfo.user_id,
    type: req.body.type,
  });
  console.log("POST /api/attend");
});

apiRouter.get("/activity/status", async (req, res) => {
  console.log("GET /api/activity/status");
  const activity = await ActivityRepository.findOne({
    where: { user: res.locals.userInfo.user_id },
    order: { datetime: "DESC" },
  });
  if (!activity) {
    res.send("leave");
    return;
  }
  res.send(activity.type);
  console.log("GET /api/activity/status");
});
export default apiRouter;
