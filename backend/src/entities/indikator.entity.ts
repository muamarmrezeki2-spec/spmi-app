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
import { Capaian } from './capaian.entity';

@Entity('indikators')
export class Indikator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  standarId: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  target: number;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @ManyToOne(() => Standar, (standar) => standar.indikators)
  @JoinColumn({ name: 'standarId' })
  standar: Standar;

  @OneToMany(() => Capaian, (capaian) => capaian.indikator)
  capaians: Capaian[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
