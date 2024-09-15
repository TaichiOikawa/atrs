import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "varchar", length: 10 })
  type: "attend" | "leave";

  @Column({ type: "datetime", default: () => "now()" })
  datetime: Date;
}
