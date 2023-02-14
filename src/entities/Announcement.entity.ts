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

  @Column({ nullable: true })
  imgFront: string;

  @Column({ nullable: true })
  imgsGallery: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
