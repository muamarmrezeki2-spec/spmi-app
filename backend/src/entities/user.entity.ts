import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Audit } from './audit.entity';

export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  LPM = 'LPM',
  AUDITOR = 'Auditor',
  PRODI_UNIT = 'Prodi/Unit',
  PIMPINAN = 'Pimpinan',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PRODI_UNIT,
  })
  role: UserRole;

  @OneToMany(() => Audit, (audit) => audit.auditor)
  audits: Audit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
