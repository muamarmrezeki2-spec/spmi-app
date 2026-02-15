import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Standar } from './standar.entity';
import { User } from './user.entity';
import { Temuan } from './temuan.entity';

export enum AuditStatus {
  SCHEDULED = 'Scheduled',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Entity('audits')
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  standarId: string;

  @Column({ type: 'date' })
  auditDate: Date;

  @Column()
  auditorId: string;

  @Column({
    type: 'enum',
    enum: AuditStatus,
    default: AuditStatus.SCHEDULED,
  })
  status: AuditStatus;

  @Column({ nullable: true })
  beritaAcaraUrl: string;

  @ManyToOne(() => Standar, (standar) => standar.audits)
  @JoinColumn({ name: 'standarId' })
  standar: Standar;

  @ManyToOne(() => User, (user) => user.audits)
  @JoinColumn({ name: 'auditorId' })
  auditor: User;

  @OneToMany(() => Temuan, (temuan) => temuan.audit)
  temuans: Temuan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
