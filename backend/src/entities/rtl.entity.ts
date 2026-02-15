import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Temuan } from './temuan.entity';
import { Unit } from './unit.entity';

export enum RTLStatus {
  PLANNED = 'Planned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  OVERDUE = 'Overdue',
}

@Entity('rtls')
export class RTL {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  temuanId: string;

  @Column()
  unitId: string;

  @Column('text')
  rencanaPerbaikan: string;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ nullable: true })
  buktiUrl: string;

  @Column({
    type: 'enum',
    enum: RTLStatus,
    default: RTLStatus.PLANNED,
  })
  status: RTLStatus;

  @OneToOne(() => Temuan, (temuan) => temuan.rtl)
  @JoinColumn({ name: 'temuanId' })
  temuan: Temuan;

  @ManyToOne(() => Unit, (unit) => unit.rtls)
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
