import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Address } from "./Address.entity";
import { Bid } from "./Bid.entity";
import { Comment } from "./Comments.entity";
import { Announcement } from "./Announcement.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column({ nullable: false })
  cellphone: string;

  @Column({ nullable: false, type: "varchar" })
  @Exclude()
  password: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "timestamptz" })
  dateOfBirth: Date;

  @Column({ type: "boolean", nullable: false, default: false })
  isAdvertiser: boolean;

  @OneToOne(() => Address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Bid, (bid) => bid.user)
  photos: Bid[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
