import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User.entity";
import { v4 as uuid } from "uuid";
import { Image } from "./Image.entity";
import { Comment } from "./Comments.entity";
import { Exclude } from "class-transformer";
import { Bid } from "./Bid.entity";

@Entity("announcements")
export class Announcement {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "boolean", nullable: false })
  isAuction: boolean;

  @Column({ nullable: false })
  vehicleType: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  mileage: number;

  @Column({ nullable: false })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: "boolean", nullable: false, default: false })
  isSold: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  initialBid: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  actualBid: number;

  @Column({ nullable: true })
  imgMain: string;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ type: "varchar" })
  year: string;

  @OneToMany(() => Image, (image) => image.announcement, {
    eager: true,
    cascade: true,
  })
  imgs: Image[];

  @OneToMany(() => Bid, (bid) => bid.announcement, {
    cascade: true,
  })
  bids: Bid[];

  @OneToMany(() => Comment, (comment) => comment.announcement, {
    eager: true,
    cascade: true,
  })
  comments: Comment[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
