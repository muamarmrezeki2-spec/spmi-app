import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Indikator } from './indikator.entity';
import { Unit } from './unit.entity';

export enum CapaianStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('capaians')
export class Capaian {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  indikatorId: string;

  @Column()
  unitId: string;

  @Column()
  periode: string;

  @Column('decimal', { precision: 10, scale: 2 })
  nilai: number;

  @Column({ nullable: true })
  buktiUrl: string;

  @Column({
    type: 'enum',
    enum: CapaianStatus,
    default: CapaianStatus.PENDING,
  })
  status: CapaianStatus;

  @ManyToOne(() => Indikator, (indikator) => indikator.capaians)
  @JoinColumn({ name: 'indikatorId' })
  indikator: Indikator;

  @ManyToOne(() => Unit, (unit) => unit.capaians)
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
