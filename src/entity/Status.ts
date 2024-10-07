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
  NOT_ATTEND = "not_attend",
}

@Entity()
export class Status {
  @PrimaryColumn()
  user_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.NOT_ATTEND })
  status: StatusEnum;

  @OneToOne(() => User, (user) => user.status)
  @JoinColumn({ name: "user_id" })
  user: User;

  @BeforeInsert()
  newid() {
    this.user_id = this.user.user_id;
  }
}
