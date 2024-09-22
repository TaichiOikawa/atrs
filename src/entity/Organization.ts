import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Organization {
  @PrimaryColumn({ type: "char", length: 36 })
  organization_id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}
