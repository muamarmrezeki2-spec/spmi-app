# SPMI Backend - Database Setup Guide

This guide explains how to set up and manage the TypeORM database for the SPMI application.

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your database credentials:
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=spmi_db
DB_SYNCHRONIZE=false
DB_LOGGING=true
```

## Database Setup

### Create Database

First, create the database in MySQL:

```sql
CREATE DATABASE spmi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Run Migrations

Execute the migrations to create all tables:

```bash
npm run migration:run
```

This will create the following tables:
- `users` - System users with roles
- `units` - Organizational units/Prodi
- `standars` - Quality standards
- `indikators` - Performance indicators
- `capaians` - Achievement data
- `audits` - Internal audit records
- `temuans` - Audit findings
- `rtls` - Follow-up action plans

### Seed Sample Data (Optional)

To populate the database with sample data:

```bash
npm run seed
```

This will create:
- 5 sample users (Super Admin, LPM, Auditor, Prodi, Pimpinan)
- 4 sample units
- 4 sample standards
- 7 sample indicators

**Sample Credentials:**
- Super Admin: `admin@spmi.ac.id` / `admin123`
- LPM: `lpm@spmi.ac.id` / `lpm123`
- Auditor: `auditor@spmi.ac.id` / `auditor123`
- Prodi: `prodi@spmi.ac.id` / `prodi123`
- Pimpinan: `pimpinan@spmi.ac.id` / `pimpinan123`

⚠️ **Warning:** These are sample credentials for development only. Always use hashed passwords in production!

## Database Management Commands

### Migrations

```bash
# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# Show migration status
npm run migration:show

# Generate a new migration (after entity changes)
npm run migration:generate -- src/migrations/MigrationName
```

### Schema Management

```bash
# Synchronize schema (use with caution - can drop data)
npm run schema:sync

# Drop entire schema (dangerous - will delete all data)
npm run schema:drop
```

### Seeding

```bash
# Run seed script
npm run seed
```

## Entity Relationships

### Database Schema Overview

```
User (1) ──────────────> (many) Audit
                                  │
Unit (1) ──> (many) Capaian       │ (1)
             │                    │
             │ (many)             ▼
             │              (many) Temuan
Standar (1) ──> (many) Indikator  │ (1)
             │           │        │
             │ (1)       │ (1)    ▼
             │           │   (1) RTL <──── (1) Unit
             ▼           │
       (many) Audit      └──────> (many) Capaian
```

### Entity Details

1. **User** - System users with roles:
   - Super Admin, LPM, Auditor, Prodi/Unit, Pimpinan

2. **Unit** - Organizational units:
   - Can have many Capaian (achievements)
   - Can have many RTL (action plans)

3. **Standar** - Quality standards:
   - Can have many Indikator (indicators)
   - Can have many Audit (audits)

4. **Indikator** - Performance indicators:
   - Belongs to one Standar
   - Can have many Capaian

5. **Capaian** - Achievement data:
   - Belongs to one Indikator
   - Belongs to one Unit

6. **Audit** - Internal audit records:
   - Belongs to one Standar
   - Conducted by one User (auditor)
   - Can have many Temuan (findings)

7. **Temuan** - Audit findings:
   - Belongs to one Audit
   - Can have one RTL (action plan)
   - Classification: Mayor, Minor, Observasi

8. **RTL** - Follow-up action plans:
   - Belongs to one Temuan
   - Belongs to one Unit (responsible unit)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `DB_TYPE` | Database type | mysql |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_USERNAME` | Database username | root |
| `DB_PASSWORD` | Database password | |
| `DB_DATABASE` | Database name | spmi_db |
| `DB_SYNCHRONIZE` | Auto-sync schema (dev only) | false |
| `DB_LOGGING` | Enable SQL logging | true |

## Development Workflow

1. Make changes to entity files in `src/entities/`
2. Generate a migration: `npm run migration:generate -- src/migrations/YourMigrationName`
3. Review the generated migration file
4. Run the migration: `npm run migration:run`
5. Test your changes

## Production Considerations

- Never use `DB_SYNCHRONIZE=true` in production
- Always hash passwords before storing
- Use environment-specific `.env` files
- Backup database before running migrations
- Test migrations on staging environment first
- Use strong database credentials
- Enable SSL for database connections
- Implement proper logging and monitoring

## Troubleshooting

### Connection Issues

If you get connection errors:
1. Verify MySQL is running
2. Check database credentials in `.env`
3. Ensure database exists
4. Check firewall settings

### Migration Errors

If migrations fail:
1. Check migration files for syntax errors
2. Verify database permissions
3. Review database logs
4. Try reverting and re-running: `npm run migration:revert && npm run migration:run`

### Seed Issues

If seeding fails:
1. Ensure migrations have been run
2. Check if data already exists
3. Verify database connection

## Additional Resources

- [TypeORM Documentation](https://typeorm.io/)
- [NestJS TypeORM Integration](https://docs.nestjs.com/techniques/database)
- [MySQL Documentation](https://dev.mysql.com/doc/)
