import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @IsDateString()
  @IsNotEmpty()
  birthday_date: Date;

  @Column()
  @IsNotEmpty()
  timezone: string;

  @Column()
  @IsOptional()
  latest_sent_at: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
