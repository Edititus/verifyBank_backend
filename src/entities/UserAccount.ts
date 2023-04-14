import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id!: number;

  @Column({
    type: "varchar",
  })
  user_account_name!: string;

  @Column("varchar", { unique: true })
  user_account_number!: string;

  @Column({
    type: "varchar",
  })
  user_bank_code!: string;

  @Column({
    type: "boolean",
  })
  is_Verified!: boolean;

  @CreateDateColumn({
    type: "date",
  })
  createdAt = new Date();

  @UpdateDateColumn({
    type: "date",
  })
  updatedAt = new Date();
} 