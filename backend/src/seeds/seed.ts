import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  User,
  UserRole,
  Unit,
  Standar,
  StandarStatus,
  Indikator,
} from '../entities';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'spmi_db',
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
});

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    const userRepository = AppDataSource.getRepository(User);
    const unitRepository = AppDataSource.getRepository(Unit);
    const standarRepository = AppDataSource.getRepository(Standar);
    const indikatorRepository = AppDataSource.getRepository(Indikator);

    // Check if data already exists
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log('⚠️  Data already exists. Skipping seed.');
      await AppDataSource.destroy();
      return;
    }

    // Seed Users
    console.log('👤 Seeding users...');
    const users = [
      {
        email: 'admin@spmi.ac.id',
        password: await hashPassword('admin123'),
        name: 'Super Admin',
        phone: '08123456789',
        role: UserRole.SUPER_ADMIN,
      },
      {
        email: 'lpm@spmi.ac.id',
        password: await hashPassword('lpm123'),
        name: 'LPM Coordinator',
        phone: '08123456790',
        role: UserRole.LPM,
      },
      {
        email: 'auditor@spmi.ac.id',
        password: await hashPassword('auditor123'),
        name: 'Internal Auditor',
        phone: '08123456791',
        role: UserRole.AUDITOR,
      },
      {
        email: 'prodi@spmi.ac.id',
        password: await hashPassword('prodi123'),
        name: 'Prodi Manager',
        phone: '08123456792',
        role: UserRole.PRODI_UNIT,
      },
      {
        email: 'pimpinan@spmi.ac.id',
        password: await hashPassword('pimpinan123'),
        name: 'University Leadership',
        phone: '08123456793',
        role: UserRole.PIMPINAN,
      },
    ];

    const createdUsers = await userRepository.save(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Seed Units
    console.log('🏢 Seeding units...');
    const units = [
      {
        name: 'Program Studi Teknik Informatika',
        code: 'TI',
        description: 'Program Studi Teknik Informatika',
        head: 'Dr. John Doe',
      },
      {
        name: 'Program Studi Sistem Informasi',
        code: 'SI',
        description: 'Program Studi Sistem Informasi',
        head: 'Dr. Jane Smith',
      },
      {
        name: 'Program Studi Manajemen',
        code: 'MJ',
        description: 'Program Studi Manajemen',
        head: 'Dr. Robert Johnson',
      },
      {
        name: 'Lembaga Penjaminan Mutu',
        code: 'LPM',
        description: 'Lembaga Penjaminan Mutu Internal',
        head: 'Dr. Sarah Williams',
      },
    ];

    const createdUnits = await unitRepository.save(units);
    console.log(`✅ Created ${createdUnits.length} units`);

    // Seed Standards
    console.log('📋 Seeding standards...');
    const standards = [
      {
        title: 'Standar Pendidikan',
        description:
          'Standar mutu pendidikan yang mencakup kurikulum, pembelajaran, dan evaluasi',
        tahunAkademik: '2024/2025',
        status: StandarStatus.ACTIVE,
      },
      {
        title: 'Standar Penelitian',
        description:
          'Standar mutu penelitian yang mencakup perencanaan, pelaksanaan, dan publikasi',
        tahunAkademik: '2024/2025',
        status: StandarStatus.ACTIVE,
      },
      {
        title: 'Standar Pengabdian Masyarakat',
        description:
          'Standar mutu pengabdian masyarakat yang mencakup program dan implementasi',
        tahunAkademik: '2024/2025',
        status: StandarStatus.ACTIVE,
      },
      {
        title: 'Standar Kemahasiswaan',
        description:
          'Standar mutu layanan kemahasiswaan dan pengembangan soft skills',
        tahunAkademik: '2024/2025',
        status: StandarStatus.DRAFT,
      },
    ];

    const createdStandards = await standarRepository.save(standards);
    console.log(`✅ Created ${createdStandards.length} standards`);

    // Seed Indicators
    console.log('📊 Seeding indicators...');
    const indicators = [
      // Indicators for Standar Pendidikan
      {
        standarId: createdStandards[0].id,
        name: 'Rasio Dosen - Mahasiswa',
        description: 'Perbandingan jumlah dosen dengan mahasiswa aktif',
        target: 25.0,
        weight: 20.0,
      },
      {
        standarId: createdStandards[0].id,
        name: 'Kelulusan Tepat Waktu',
        description: 'Persentase mahasiswa yang lulus tepat waktu',
        target: 80.0,
        weight: 30.0,
      },
      {
        standarId: createdStandards[0].id,
        name: 'Kepuasan Mahasiswa',
        description: 'Indeks kepuasan mahasiswa terhadap layanan pendidikan',
        target: 85.0,
        weight: 25.0,
      },
      // Indicators for Standar Penelitian
      {
        standarId: createdStandards[1].id,
        name: 'Publikasi Jurnal Internasional',
        description: 'Jumlah publikasi di jurnal internasional bereputasi',
        target: 10.0,
        weight: 40.0,
      },
      {
        standarId: createdStandards[1].id,
        name: 'Hibah Penelitian',
        description: 'Jumlah proposal penelitian yang didanai',
        target: 15.0,
        weight: 35.0,
      },
      // Indicators for Standar Pengabdian Masyarakat
      {
        standarId: createdStandards[2].id,
        name: 'Program Pengabdian',
        description: 'Jumlah program pengabdian masyarakat yang dilaksanakan',
        target: 12.0,
        weight: 50.0,
      },
      // Indicators for Standar Kemahasiswaan
      {
        standarId: createdStandards[3].id,
        name: 'Prestasi Mahasiswa',
        description: 'Jumlah prestasi mahasiswa tingkat nasional/internasional',
        target: 8.0,
        weight: 40.0,
      },
    ];

    const createdIndicators = await indikatorRepository.save(indicators);
    console.log(`✅ Created ${createdIndicators.length} indicators`);

    console.log('\n🎉 Database seed completed successfully!');
    console.log('\n📝 Sample credentials:');
    console.log('  Super Admin: admin@spmi.ac.id / admin123');
    console.log('  LPM: lpm@spmi.ac.id / lpm123');
    console.log('  Auditor: auditor@spmi.ac.id / auditor123');
    console.log('  Prodi: prodi@spmi.ac.id / prodi123');
    console.log('  Pimpinan: pimpinan@spmi.ac.id / pimpinan123');
    console.log('\n✅ All passwords are securely hashed using bcrypt');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
