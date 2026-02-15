import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Unit } from './entities/unit.entity';
import { Standar } from './entities/standar.entity';
import { Indikator } from './entities/indikator.entity';
import { Capaian } from './entities/capaian.entity';
import { Audit } from './entities/audit.entity';
import { Temuan } from './entities/temuan.entity';
import { RTL } from './entities/rtl.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'spmi_db',
      entities: [User, Unit, Standar, Indikator, Capaian, Audit, Temuan, RTL],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}