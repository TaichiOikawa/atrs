import Router from "express-promise-router";
import { Not } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Activity } from "../../entity/Activity";
import { PermissionEnum, User } from "../../entity/User";
import allLeave from "../../modules/allLeave";
import { notifyTypeEnum, socketStatusNotify } from "../../socket/events/room";

const organizationRouter = Router();
const ActivityRepository = AppDataSource.getRepository(Activity);
const userRepository = AppDataSource.getRepository(User);

organizationRouter.get("/:organization_id/users", async (req, res) => {
  console.debug(`GET /api/organization/${req.params.organization_id}/users`);

  if (
    ![
      PermissionEnum.ADMIN,
      PermissionEnum.TEACHER,
      PermissionEnum.MODERATOR,
    ].includes(res.locals.userInfo.permission)
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
    where: [
      {
        user: {
          permission: Not(PermissionEnum.ADMIN),
          organization: {
            organization_id: organizationId,
          },
        },
      },
      {
        user: {
          permission: Not(PermissionEnum.TEACHER),
          organization: {
            organization_id: organizationId,
          },
        },
      },
    ],
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

organizationRouter.get("/:organization_id/status", async (req, res) => {
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
    .andWhere("user.permission != 'admin' AND user.permission != 'teacher'")
    .orderBy("user.login_id")
    .getRawMany();

  if (!activeUsers) {
    res.status(404).send("Organization not found");
    return;
  }
  res.send(activeUsers);
});

organizationRouter.post("/:organization_id/all-leave", async (req, res) => {
  await allLeave();
  socketStatusNotify(notifyTypeEnum.ALL_LEAVE);
  res.status(200).send("All leave done");
});

export default organizationRouter;
