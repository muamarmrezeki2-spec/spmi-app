import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1707995858000 implements MigrationInterface {
  name = 'InitialSchema1707995858000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`phone\` varchar(255) NULL,
        \`role\` enum('Super Admin', 'LPM', 'Auditor', 'Prodi/Unit', 'Pimpinan') NOT NULL DEFAULT 'Prodi/Unit',
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        UNIQUE INDEX \`IDX_users_email\` (\`email\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create units table
    await queryRunner.query(`
      CREATE TABLE \`units\` (
        \`id\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`code\` varchar(255) NOT NULL,
        \`description\` text NULL,
        \`head\` varchar(255) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        UNIQUE INDEX \`IDX_units_code\` (\`code\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create standars table
    await queryRunner.query(`
      CREATE TABLE \`standars\` (
        \`id\` varchar(36) NOT NULL,
        \`title\` varchar(255) NOT NULL,
        \`description\` text NOT NULL,
        \`tahunAkademik\` varchar(255) NOT NULL,
        \`status\` enum('Draft', 'Active', 'Inactive') NOT NULL DEFAULT 'Draft',
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create indikators table
    await queryRunner.query(`
      CREATE TABLE \`indikators\` (
        \`id\` varchar(36) NOT NULL,
        \`standarId\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`description\` text NOT NULL,
        \`target\` decimal(10,2) NOT NULL,
        \`weight\` decimal(5,2) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        INDEX \`IDX_indikators_standarId\` (\`standarId\`),
        CONSTRAINT \`FK_indikators_standarId\` FOREIGN KEY (\`standarId\`) REFERENCES \`standars\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create capaians table
    await queryRunner.query(`
      CREATE TABLE \`capaians\` (
        \`id\` varchar(36) NOT NULL,
        \`indikatorId\` varchar(36) NOT NULL,
        \`unitId\` varchar(36) NOT NULL,
        \`periode\` varchar(255) NOT NULL,
        \`nilai\` decimal(10,2) NOT NULL,
        \`buktiUrl\` varchar(255) NULL,
        \`status\` enum('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        INDEX \`IDX_capaians_indikatorId\` (\`indikatorId\`),
        INDEX \`IDX_capaians_unitId\` (\`unitId\`),
        CONSTRAINT \`FK_capaians_indikatorId\` FOREIGN KEY (\`indikatorId\`) REFERENCES \`indikators\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT \`FK_capaians_unitId\` FOREIGN KEY (\`unitId\`) REFERENCES \`units\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create audits table
    await queryRunner.query(`
      CREATE TABLE \`audits\` (
        \`id\` varchar(36) NOT NULL,
        \`standarId\` varchar(36) NOT NULL,
        \`auditDate\` date NOT NULL,
        \`auditorId\` varchar(36) NOT NULL,
        \`status\` enum('Scheduled', 'In Progress', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Scheduled',
        \`beritaAcaraUrl\` varchar(255) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        INDEX \`IDX_audits_standarId\` (\`standarId\`),
        INDEX \`IDX_audits_auditorId\` (\`auditorId\`),
        CONSTRAINT \`FK_audits_standarId\` FOREIGN KEY (\`standarId\`) REFERENCES \`standars\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT \`FK_audits_auditorId\` FOREIGN KEY (\`auditorId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create temuans table
    await queryRunner.query(`
      CREATE TABLE \`temuans\` (
        \`id\` varchar(36) NOT NULL,
        \`auditId\` varchar(36) NOT NULL,
        \`deskripsi\` text NOT NULL,
        \`klasifikasi\` enum('Mayor', 'Minor', 'Observasi') NOT NULL,
        \`rtlId\` varchar(36) NULL,
        \`status\` enum('Open', 'In Progress', 'Closed') NOT NULL DEFAULT 'Open',
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        INDEX \`IDX_temuans_auditId\` (\`auditId\`),
        UNIQUE INDEX \`IDX_temuans_rtlId\` (\`rtlId\`),
        CONSTRAINT \`FK_temuans_auditId\` FOREIGN KEY (\`auditId\`) REFERENCES \`audits\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create rtls table
    await queryRunner.query(`
      CREATE TABLE \`rtls\` (
        \`id\` varchar(36) NOT NULL,
        \`temuanId\` varchar(36) NOT NULL,
        \`unitId\` varchar(36) NOT NULL,
        \`rencanaPerbaikan\` text NOT NULL,
        \`deadline\` date NOT NULL,
        \`buktiUrl\` varchar(255) NULL,
        \`status\` enum('Planned', 'In Progress', 'Completed', 'Overdue') NOT NULL DEFAULT 'Planned',
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`),
        INDEX \`IDX_rtls_temuanId\` (\`temuanId\`),
        INDEX \`IDX_rtls_unitId\` (\`unitId\`),
        CONSTRAINT \`FK_rtls_temuanId\` FOREIGN KEY (\`temuanId\`) REFERENCES \`temuans\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT \`FK_rtls_unitId\` FOREIGN KEY (\`unitId\`) REFERENCES \`units\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Add foreign key constraint from temuans to rtls (one-to-one relationship)
    await queryRunner.query(`
      ALTER TABLE \`temuans\`
      ADD CONSTRAINT \`FK_temuans_rtlId\` FOREIGN KEY (\`rtlId\`) REFERENCES \`rtls\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints first
    await queryRunner.query(`ALTER TABLE \`temuans\` DROP FOREIGN KEY \`FK_temuans_rtlId\``);
    await queryRunner.query(`ALTER TABLE \`rtls\` DROP FOREIGN KEY \`FK_rtls_unitId\``);
    await queryRunner.query(`ALTER TABLE \`rtls\` DROP FOREIGN KEY \`FK_rtls_temuanId\``);
    await queryRunner.query(`ALTER TABLE \`temuans\` DROP FOREIGN KEY \`FK_temuans_auditId\``);
    await queryRunner.query(`ALTER TABLE \`audits\` DROP FOREIGN KEY \`FK_audits_auditorId\``);
    await queryRunner.query(`ALTER TABLE \`audits\` DROP FOREIGN KEY \`FK_audits_standarId\``);
    await queryRunner.query(`ALTER TABLE \`capaians\` DROP FOREIGN KEY \`FK_capaians_unitId\``);
    await queryRunner.query(`ALTER TABLE \`capaians\` DROP FOREIGN KEY \`FK_capaians_indikatorId\``);
    await queryRunner.query(`ALTER TABLE \`indikators\` DROP FOREIGN KEY \`FK_indikators_standarId\``);

    // Drop tables
    await queryRunner.query(`DROP TABLE \`rtls\``);
    await queryRunner.query(`DROP TABLE \`temuans\``);
    await queryRunner.query(`DROP TABLE \`audits\``);
    await queryRunner.query(`DROP TABLE \`capaians\``);
    await queryRunner.query(`DROP TABLE \`indikators\``);
    await queryRunner.query(`DROP TABLE \`standars\``);
    await queryRunner.query(`DROP TABLE \`units\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
