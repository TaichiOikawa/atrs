import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Absent {
  @PrimaryGeneratedColumn()
  absent_id: number;

  @ManyToOne(() => User, (user) => user.absents)
  author: User;

  @Column({ type: "varchar", length: 10 })
  type: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "datetime", default: () => "now()" })
  update_time: Date;
}
