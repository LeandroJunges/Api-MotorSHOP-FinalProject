import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { v4 as uuid } from "uuid";
import { Announcement } from "./Announcement.entity";

@Entity("bids")
export class Bid {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  value: number;

  @ManyToOne(() => Announcement, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  announcement: Announcement;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
