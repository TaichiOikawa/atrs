import Router from "express-promise-router";
import { schedule } from "node-cron";
import { IsNull, Raw } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";
import { Status, StatusEnum } from "../../entity/Status";
import { PermissionEnum, User } from "../../entity/User";
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
  console.debug("GET /api");
  res.send("API root");
});

apiRouter.get("/activity", async (req, res) => {
  console.debug("GET /api/activity");

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
    .andWhere("activity.isAutoLeave = false")
    .getRawOne();

  const totalTime = await ActivityRepository.createQueryBuilder("activity")
    .select("SEC_TO_TIME(SUM(TIME_TO_SEC(activity.activityTime)))", "totalTime")
    .where("activity.user = :user", { user: res.locals.userInfo.user_id })
    .andWhere("activity.isAutoLeave = false")
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
  }
  res.send("OK");
});

apiRouter.get("/activity/status", async (req, res) => {
  console.debug("GET /api/activity/status");
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

apiRouter.get("/organization/:organization_id/users", async (req, res) => {
  console.debug(`GET /api/organization/${req.params.organization_id}/users`);

  if (res.locals.userInfo.permission !== PermissionEnum.ADMIN) {
    res.status(403).send("Permission denied");
    return;
  }

  const organizationId = req.params.organization_id;

  const users = await userRepository.find({
    select: ["user_id", "login_id", "name", "permission", "status"],
    where: {
      organization: {
        organization_id: organizationId,
      },
    },
    relations: ["status"],
  });

  res.send(users);
});

apiRouter.get("/organization/:organization_id/status", async (req, res) => {
  console.debug(`GET /api/organization/${req.params.organization_id}/status`);

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

const AutoLeave = async () => {
  console.log("[AUTO LEAVE] WORKING");
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
    activity.isAutoLeave = true;
    await ActivityRepository.save(activity);
    console.log(`[AUTO LEAVE] UserID: ${activity.user.login_id}  [auto leave]`);
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
      activity.isAutoLeave = true;
      await ActivityRepository.save(activity);
    }
    console.log(`[AUTO LEAVE] UserID: ${status.user.login_id}  [auto leave]`);
  });
  console.log("[AUTO LEAVE] FINISHED");
};

const PostNotification = async () => {
  console.log("[Post Notification] WORKING");
  const activities = await ActivityRepository.find({
    where: {
      attendTime: Raw((alias) => `DATE(${alias}) = :today`, {
        today: new Date().toISOString().slice(0, 10),
      }),
    },
    relations: ["user"],
  });

  if (activities.length === 0) {
    return;
  }

  const userActivityMap = new Map();

  activities.forEach((activity) => {
    const userName = activity.user.name;
    if (!userActivityMap.has(userName)) {
      userActivityMap.set(userName, {
        userName: userName,
        activities: [],
        isAutoLeave: activity.isAutoLeave,
      });
    }

    userActivityMap.get(userName).activities.push({
      attendTime: datetime.format(activity.attendTime),
      leaveTime: datetime.format(activity.leaveTime) || null,
      activityTime: activity.activityTime || null,
    });
  });

  type activitiesType = {
    userName: string;
    activities: {
      attendTime: string;
      leaveTime: string | null;
      activityTime: string | null;
    }[];
  }[];

  const result = Array.from(userActivityMap.values()) as activitiesType;

  await postWebhook({
    embeds: [
      {
        title: "本日の活動記録",
        fields: result.map((user) => {
          return {
            name: user.userName,
            value:
              user.activities.length > 1
                ? user.activities
                    .map((activity, index) => {
                      return `**${index + 1}.**\n出席: ${
                        activity.attendTime
                      }\n退席: ${activity.leaveTime}\n活動時間: ${
                        activity.activityTime
                      }`;
                    })
                    .join("\n")
                : `出席: ${user.activities[0].attendTime}\n退席: ${user.activities[0].leaveTime}\n活動時間: ${user.activities[0].activityTime}`,
            inline: true,
          };
        }),
        color: 0x15edc9,
      },
    ],
  });

  console.log("[Post Notification] FINISHED");
};

// At 23:00 every day
schedule("00 23 * * *", async () => {
  await AutoLeave();

  console.log("[Scheduled] UPDATE STATUS");
  await statusRepository.update({}, { status: StatusEnum.NOT_ATTEND });

  await PostNotification();
});

export default apiRouter;
