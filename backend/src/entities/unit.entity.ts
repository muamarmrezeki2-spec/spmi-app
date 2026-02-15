import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Capaian } from './capaian.entity';
import { RTL } from './rtl.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  head: string;

  @OneToMany(() => Capaian, (capaian) => capaian.unit)
  capaians: Capaian[];

  @OneToMany(() => RTL, (rtl) => rtl.unit)
  rtls: RTL[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
