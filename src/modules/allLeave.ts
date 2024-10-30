import { IsNull } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Activity } from "../entity/Activity";
import { Status, StatusEnum } from "../entity/Status";
import { socketStatusReload } from "../socket/events/room";
import { timeDiff } from "./time";

const ActivityRepository = AppDataSource.getRepository(Activity);
const statusRepository = AppDataSource.getRepository(Status);

export default async function allLeave(auto: boolean = false) {
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
    if (auto) activity.isAutoLeave = true;
    await ActivityRepository.save(activity);

    const status = await statusRepository.findOne({
      where: {
        user: activity.user,
      },
    });
    if (status) {
      status.status = StatusEnum.LEAVE;
      await statusRepository.save(status);
    }

    console.log(`[AUTO LEAVE] UserID: ${activity.user.login_id}  [auto leave]`);
    socketStatusReload();
  });
}
