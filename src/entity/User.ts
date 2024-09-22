import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Absent } from "./Absent";
import { Activity } from "./Activity";
import { Organization } from "./Organization";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "char", length: 4, unique: true })
  login_id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 128 })
  password: string;

  @Column({ type: "varchar", length: 20 })
  permission: "admin" | "moderator" | "user";

  @ManyToOne(() => Organization, (organization) => organization.users, {
    onDelete: "CASCADE",
    nullable: false,
  })
  organization: Organization;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];

  @OneToMany(() => Absent, (absent) => absent.author)
  absents: Absent[];
}
