import { Column, JoinColumn, ManyToOne, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity({ name: "user_auths" })
export class UserAuth extends BaseEntity{
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  @ManyToOne(() => User, {
    cascade: true
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
