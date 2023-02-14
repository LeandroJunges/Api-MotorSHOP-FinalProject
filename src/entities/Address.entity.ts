import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { v4 as uuid } from "uuid";

@Entity("addresses")
export class Address {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: true })
  complement: string;

  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
