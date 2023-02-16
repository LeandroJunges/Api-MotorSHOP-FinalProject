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

@Entity("comments")
export class Comment {
  @PrimaryColumn("uuid")
  readonly id: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Announcement)
  @JoinColumn()
  announcement: Announcement;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
