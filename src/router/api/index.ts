import Router from "express-promise-router";
import { IsNull, Raw } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";
import { Status, StatusEnum } from "../../entity/Status";
import { PermissionEnum, User } from "../../entity/User";
import { timeDiff } from "../../modules/time";
import { reload } from "../../socket/events/room";

const apiRouter = Router();
const ActivityRepository = AppDataSource.getRepository(Activity);
const userRepository = AppDataSource.getRepository(User);
const statusRepository = AppDataSource.getRepository(Status);

const socketReload = () => {
  console.debug("[Socket] user_status: reload");
  reload("user_status");
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
    attendTime: activityInDb?.attendTime || null,
    leaveTime: activityInDb?.leaveTime || null,
    activityTime: activityInDb?.activityTime || null,
    weeklyTime: weeklyTime?.weeklyTime || null,
    totalTime: totalTime?.totalTime || null,
  };

  res.send(activity);
});

apiRouter.post("/activity", async (req, res) => {
  console.debug("POST /api/activity");
  if (
    req.body.userId &&
    res.locals.userInfo.permission === PermissionEnum.ADMIN &&
    res.locals.userInfo.permission === PermissionEnum.MODERATOR
  ) {
    var user = await userRepository.findOne({
      where: {
        user_id: req.body.userId,
      },
    });
  } else {
    var user = await userRepository.findOne({
      where: {
        user_id: res.locals.userInfo.user_id,
      },
    });
  }
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
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
      user_id: user.user_id,
      status: StatusEnum.LEAVE,
    });
    res.send(StatusEnum.LEAVE);
  } else {
    // 出席記録がない場合は新規レコード
    const now = new Date();
    await ActivityRepository.insert({
      user: user,
      attendTime: now,
    });
    // statusを更新
    await statusRepository.save({
      user_id: user.user_id,
      status: StatusEnum.ACTIVE,
    });
    res.send(StatusEnum.ACTIVE);
  }

  socketReload();
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

  if (
    res.locals.userInfo.permission !== PermissionEnum.ADMIN &&
    res.locals.userInfo.permission !== PermissionEnum.MODERATOR &&
    res.locals.userInfo.permission !== PermissionEnum.TEACHER
  ) {
    res.status(403).send("Permission denied");
    return;
  }

  const organizationId = req.params.organization_id;

  // ユーザー情報を取得
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

  // 最新の活動記録を取得
  const activities = await ActivityRepository.find({
    where: {
      user: {
        organization: {
          organization_id: organizationId,
        },
      },
    },
    relations: ["user"],
    order: { activity_id: "DESC" },
  });

  // アクティビティをユーザーIDごとにマッピング
  const userActivityMap = new Map();

  activities.forEach((activity) => {
    const userId = activity.user.user_id;

    // まだそのユーザーの最新アクティビティがない場合のみ追加
    if (!userActivityMap.has(userId)) {
      userActivityMap.set(userId, {
        attendTime: activity.attendTime,
        leaveTime: activity.leaveTime,
        activityTime: activity.activityTime,
        isAutoLeave: activity.isAutoLeave,
      });
    }
  });

  // usersに対応するアクティビティを追加
  const result = users.map((user) => {
    const activityInfo = userActivityMap.get(user.user_id);
    return {
      user_id: user.user_id,
      login_id: user.login_id,
      name: user.name,
      permission: user.permission,
      status: user.status?.status || null,
      activity: activityInfo
        ? {
            attendTime: activityInfo.attendTime,
            leaveTime: activityInfo.leaveTime,
            activityTime: activityInfo.activityTime,
            isAutoLeave: activityInfo.isAutoLeave,
          }
        : null,
    };
  });

  res.send(result);
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
