import { schedule } from "node-cron";
import { Raw } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Activity } from "../../src/entity/Activity";
import { Status, StatusEnum } from "../../src/entity/Status";
import postWebhook from "../../src/modules/discordWebhook";
import { datetime } from "../../src/modules/time";
import allLeave from "../modules/allLeave";

const ActivityRepository = AppDataSource.getRepository(Activity);
const statusRepository = AppDataSource.getRepository(Status);

const AutoLeave = async () => {
  console.log("[AUTO LEAVE] WORKING");
  await allLeave();
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
      leaveTime: datetime.format(activity.leaveTime) ?? null,
      activityTime: activity.activityTime ?? null,
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
