import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAppointments1690696269493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'initial_date',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'final_date',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'confirm',
            type: 'boolean',
            default: false,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'details',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        indices: [{ columnNames: ['status'], isUnique: false }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
