import Router from "express-promise-router";
import { IsNull, Raw } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";
import { Status, StatusEnum } from "../../entity/Status";
import { PermissionEnum, User } from "../../entity/User";
import { timeDiff } from "../../modules/time";

const apiRouter = Router();
const ActivityRepository = AppDataSource.getRepository(Activity);
const userRepository = AppDataSource.getRepository(User);
const statusRepository = AppDataSource.getRepository(Status);

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
    attendTime: activityInDb?.attendTime || null,
    leaveTime: activityInDb?.leaveTime || null,
    activityTime: activityInDb?.activityTime || null,
    weeklyTime: weeklyTime?.weeklyTime || null,
    totalTime: totalTime?.totalTime || null,
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
  const activityInDb = await statusRepository.findOne({
    where: {
      user: user,
    },
  });
  if (!activityInDb) {
    res.send(StatusEnum.NOT_ATTEND);
    return;
  }
  res.send(activityInDb.status);
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

  if (!users) {
    res.status(404).send("Organization not found");
    return;
  }

  res.send(users);
});

apiRouter.get("/organization/:organization_id/status", async (req, res) => {
  console.debug(`GET /api/organization/${req.params.organization_id}/status`);

  const organizationId = req.params.organization_id;

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

  if (!activeUsers) {
    res.status(404).send("Organization not found");
    return;
  }
  res.send(activeUsers);
});

export default apiRouter;
