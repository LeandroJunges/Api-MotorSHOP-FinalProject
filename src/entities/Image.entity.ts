import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Announcement } from "./Announcement.entity";

@Entity("images")
export class Image {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar" })
  link: string;

  @ManyToOne(() => Announcement, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  announcement: Announcement;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
