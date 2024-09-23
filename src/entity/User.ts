import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Absent } from "./Absent";
import { Activity } from "./Activity";
import { Organization } from "./Organization";
import { Status } from "./Status";

export enum PermissionEnum {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
  UNREGISTERED = "unregistered",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "char", length: 4, unique: true })
  login_id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 128, nullable: true })
  password: string;

  @Column({
    type: "enum",
    enum: PermissionEnum,
    default: PermissionEnum.UNREGISTERED,
  })
  permission: PermissionEnum;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    onDelete: "CASCADE",
    nullable: false,
  })
  organization: Organization;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[];

  @OneToMany(() => Absent, (absent) => absent.author)
  absents: Absent[];

  @OneToOne(() => Status, (status) => status.user, { cascade: true })
  status: Status;
}
