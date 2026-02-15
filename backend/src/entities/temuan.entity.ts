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
import { Audit } from './audit.entity';
import { RTL } from './rtl.entity';

export enum TemuanKlasifikasi {
  MAYOR = 'Mayor',
  MINOR = 'Minor',
  OBSERVASI = 'Observasi',
}

export enum TemuanStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed',
}

@Entity('temuans')
export class Temuan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  auditId: string;

  @Column('text')
  deskripsi: string;

  @Column({
    type: 'enum',
    enum: TemuanKlasifikasi,
  })
  klasifikasi: TemuanKlasifikasi;

  @Column({ nullable: true })
  rtlId: string;

  @Column({
    type: 'enum',
    enum: TemuanStatus,
    default: TemuanStatus.OPEN,
  })
  status: TemuanStatus;

  @ManyToOne(() => Audit, (audit) => audit.temuans)
  @JoinColumn({ name: 'auditId' })
  audit: Audit;

  @OneToOne(() => RTL, (rtl) => rtl.temuan, { nullable: true })
  @JoinColumn({ name: 'rtlId' })
  rtl: RTL;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
