import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

export enum StatusEnum {
  ACTIVE = "active",
  LEAVE = "leave",
  AUTO_LEAVE = "auto_leave",
}

@Entity()
export class Status {
  @PrimaryColumn()
  user_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.LEAVE })
  status: StatusEnum;

  @OneToOne(() => User, (user) => user.status)
  @JoinColumn({ name: "user_id" })
  user: User;

  @BeforeInsert()
  newid() {
    this.user_id = this.user.user_id;
  }
}
