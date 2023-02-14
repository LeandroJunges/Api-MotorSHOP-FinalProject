import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { v4 as uuid } from "uuid";
import { Announcement } from "./Announcement.entity";

@Entity("bids")
export class Bid {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  value: number;

  @ManyToOne(() => Announcement)
  @JoinColumn()
  announcement: Announcement;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
