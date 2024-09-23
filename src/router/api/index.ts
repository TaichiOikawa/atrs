import Router from "express-promise-router";
import { schedule } from "node-cron";
import { IsNull, Raw } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";
import { Status, StatusEnum } from "../../entity/Status";
import { User } from "../../entity/User";
import postWebhook from "../../modules/discordWebhook";

const apiRouter = Router();
const ActivityRepository = AppDataSource.getRepository(Activity);
const userRepository = AppDataSource.getRepository(User);
const statusRepository = AppDataSource.getRepository(Status);

const datetime = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

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
  console.log("GET /api");
  res.send("API root");
});

apiRouter.get("/activity", async (req, res) => {
  console.log("GET /api/activity");

  const user = await userRepository.findOne({
    where: {
      user_id: res.locals.userInfo.user_id,
    },
  });
  if (!user) {
    res.status(400).send("User not found");
    return;
  }

  const today = new Date();
  // 本日の活動記録を取得
  const activityInDb = await ActivityRepository.findOne({
    where: {
      user: user,
      attendTime: Raw((alias) => `DATE(${alias}) = :today`, {
        today: today.toISOString().slice(0, 10),
      }),
    },
    order: { activity_id: "DESC" },
  });

  console.log(activityInDb);

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
    attendTime: activityInDb?.attendTime || "",
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

  const user = await userRepository.findOne({
    where: {
      user_id: res.locals.userInfo.user_id,
    },
  });
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  const today = new Date();
  const activityInDb = await ActivityRepository.findOne({
    where: {
      user: user,
      leaveTime: IsNull(),
    },
    order: { activity_id: "DESC" },
    relations: ["user"],
  });

  if (activityInDb) {
    // 既に出席記録がある場合は退席時間を記録
    activityInDb.leaveTime = new Date();
    let diff = timeDiff(activityInDb.attendTime, activityInDb.leaveTime);
    activityInDb.activityTime = `${diff.hours}:${diff.minutes}:${diff.seconds}`;
    await ActivityRepository.save(activityInDb);
    // statusを更新
    await statusRepository.save({
      user_id: res.locals.userInfo.user_id,
      status: StatusEnum.LEAVE,
    });
    await postWebhook({
      embeds: [
        {
          title: "退席",
          description: `**${
            activityInDb.user.name
          }** が退席しました\n出席時間: ${datetime.format(
            activityInDb.attendTime
          )}\n退席時間: ${datetime.format(activityInDb.leaveTime)}`,
          color: 0xf1b473,
        },
      ],
    });
  } else {
    // 出席記録がない場合は新規レコード
    const now = new Date();
    await ActivityRepository.insert({
      user: user,
      attendTime: now,
    });
    // statusを更新
    await statusRepository.save({
      user_id: res.locals.userInfo.user_id,
      status: StatusEnum.ACTIVE,
    });
    await postWebhook({
      embeds: [
        {
          title: "出席",
          description: `**${
            res.locals.userInfo.name
          }** が出席しました\n出席時間: ${datetime.format(now)}`,
          color: 0x73bef1,
        },
      ],
    });
  }
  res.send("OK");
});

apiRouter.get("/activity/status", async (req, res) => {
  console.log("GET /api/activity/status");
  const user = await userRepository.findOne({
    where: {
      user_id: res.locals.userInfo.user_id,
    },
  });
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  const today = new Date();
  const activityInDb = await ActivityRepository.findOne({
    where: {
      user: user,
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

apiRouter.get("/organization/:organization_id/status", async (req, res) => {
  console.log(`GET /api/organization/${req.params.organization_id}/status`);

  const organizationId = req.params.organization_id;
  const users = await userRepository.count({
    where: {
      organization: {
        organization_id: organizationId,
      },
    },
  });

  const activeUsers = await userRepository
    .createQueryBuilder("user")
    .innerJoinAndSelect("user.status", "status")
    .innerJoinAndSelect("user.organization", "organization")
    .select("user.login_id", "login_id")
    .addSelect("user.name", "name")
    .addSelect("status.status", "status")
    .where("organization.organization_id = :organizationId", {
      organizationId,
    })
    .orderBy("user.login_id")
    .getRawMany();

  res.send(activeUsers);
});

// 毎日0時に退席していない人のstatus, activityを更新
schedule("00 00 * * *", async () => {
  console.log("[Scheduled] Update status and activity");
  const activities = await ActivityRepository.find({
    where: {
      leaveTime: IsNull(),
    },
    relations: ["user"],
  });
  activities.forEach(async (activity) => {
    activity.leaveTime = new Date();
    let diff = timeDiff(activity.attendTime, activity.leaveTime);
    activity.activityTime = `${diff.hours}:${diff.minutes}:${diff.seconds}`;
    await ActivityRepository.save(activity);

    // statusを更新
    await statusRepository.save({
      user_id: activity.user.user_id,
      status: StatusEnum.AUTO_LEAVE,
    });
    console.log(`[Scheduled] UserID: ${activity.user.login_id}  [auto leave]`);
  });

  const statuses = await statusRepository.find({
    where: {
      status: StatusEnum.ACTIVE,
    },
    relations: ["user"],
  });
  statuses.forEach(async (status) => {
    const activity = await ActivityRepository.findOne({
      where: {
        user: status.user,
      },
    });
    if (activity?.leaveTime === null) {
      activity.leaveTime = new Date();
      let diff = timeDiff(activity.attendTime, activity.leaveTime);
      activity.activityTime = `${diff.hours}:${diff.minutes}:${diff.seconds}`;
      await ActivityRepository.save(activity);
    }
    await statusRepository.save({
      user_id: status.user_id,
      status: StatusEnum.AUTO_LEAVE,
    });
    console.log(`[Scheduled] UserID: ${status.user.login_id}  [auto leave]`);
  });
});

export default apiRouter;
