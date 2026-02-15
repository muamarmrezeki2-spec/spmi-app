import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Indikator } from './indikator.entity';
import { Audit } from './audit.entity';

export enum StandarStatus {
  DRAFT = 'Draft',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Entity('standars')
export class Standar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  tahunAkademik: string;

  @Column({
    type: 'enum',
    enum: StandarStatus,
    default: StandarStatus.DRAFT,
  })
  status: StandarStatus;

  @OneToMany(() => Indikator, (indikator) => indikator.standar)
  indikators: Indikator[];

  @OneToMany(() => Audit, (audit) => audit.standar)
  audits: Audit[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
