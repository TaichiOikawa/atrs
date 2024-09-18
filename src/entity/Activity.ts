import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "datetime" })
  attendTime: Date;

  @Column({ type: "datetime", nullable: true, default: null })
  leaveTime: Date;

  @Column({ type: "time", nullable: true, default: null })
  activityTime: String;
}
