import Router from "express-promise-router";
import { IsNull, Raw } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";

const apiRouter = Router();
const ActivityRepository = AppDataSource.getRepository(Activity);

const timeDiff = (start: Date, end: Date) => {
  let diff = end.getTime() - start.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  let minutes = Math.floor((diff - hours * 1000 * 60 * 60) / 1000 / 60);
  let seconds = Math.floor(
    (diff - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000
  );
  return { hours, minutes, seconds };
};

apiRouter.get("/", (req, res) => {
  res.send("API root");
});

apiRouter.get("/activity", async (req, res) => {
  console.log("GET /api/activity");
  const today = new Date();
  // 本日の活動記録を取得
  const activityInDb = await ActivityRepository.findOne({
    where: {
      user: res.locals.userInfo.user_id,
      attendTime: Raw((alias) => `DATE(${alias}) = :today`, {
        today: today.toISOString().slice(0, 10),
      }),
    },
    order: { activity_id: "DESC" },
  });

  // 週間活動時間を取得
  let sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyTime = await ActivityRepository.createQueryBuilder("activity")
    .select(
      "SEC_TO_TIME(SUM(TIME_TO_SEC(activity.activityTime)))",
      "weeklyTime"
    )
    .where("activity.user = :user", { user: res.locals.userInfo.user_id })
    .andWhere("activity.attendTime >= :start", {
      start: sevenDaysAgo.toISOString().slice(0, 10),
    })
    .getRawOne();

  const totalTime = await ActivityRepository.createQueryBuilder("activity")
    .select("SEC_TO_TIME(SUM(TIME_TO_SEC(activity.activityTime)))", "totalTime")
    .where("activity.user = :user", { user: res.locals.userInfo.user_id })
    .getRawOne();

  const activity = {
    attendTime: activityInDb?.attendTime,
    leaveTime: activityInDb?.leaveTime || "",
    activityTime: activityInDb?.activityTime || "",
    weeklyTime: weeklyTime?.weeklyTime || "",
    totalTime: totalTime?.totalTime || "",
  };

  res.send(activity);
  console.log("GET /api/activity");
});

apiRouter.post("/activity", async (req, res) => {
  console.log("POST /api/activity");
  const today = new Date();
  // 本日の活動記録で退席記録がないものを取得
  const activityInDb = await ActivityRepository.findOne({
    where: {
      user: res.locals.userInfo.user_id,
      attendTime: Raw((alias) => `DATE(${alias}) = :today`, {
        today: today.toISOString().slice(0, 10),
      }),
      leaveTime: IsNull(),
    },
    order: { activity_id: "DESC" },
  });

  if (activityInDb) {
    // 既に出席記録がある場合は退席時間を記録
    activityInDb.leaveTime = new Date();
    let diff = timeDiff(activityInDb.attendTime, activityInDb.leaveTime);
    activityInDb.activityTime = `${diff.hours}:${diff.minutes}:${diff.seconds}`;
    await ActivityRepository.save(activityInDb);
  } else {
    // 出席記録がない場合は新規レコード
    await ActivityRepository.insert({
      user: res.locals.userInfo.user_id,
      attendTime: new Date(),
    });
  }
  res.send("OK");
});

apiRouter.get("/activity/status", async (req, res) => {
  console.log("GET /api/activity/status");
  const today = new Date();
  // 本日の活動記録を取得
  const activityInDb = await ActivityRepository.findOne({
    where: {
      user: res.locals.userInfo.user_id,
      attendTime: Raw((alias) => `DATE(${alias}) = :today`, {
        today: today.toISOString().slice(0, 10),
      }),
    },
    order: { activity_id: "DESC" },
  });
  if (!activityInDb) {
    res.send("leave");
  } else {
    if (activityInDb.leaveTime) {
      res.send("leave");
    } else {
      res.send("attend");
    }
  }
});
export default apiRouter;
