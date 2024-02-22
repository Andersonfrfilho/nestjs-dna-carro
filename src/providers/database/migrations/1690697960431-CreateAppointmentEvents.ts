import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAppointmentEvent1690697421936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments_events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'appointment_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'participant',
            type: 'varchar',
          },
          {
            name: 'details',
            type: 'jsonb',
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
        foreignKeys: [
          {
            name: 'FKAppointmentsServices',
            referencedTableName: 'appointments',
            referencedColumnNames: ['id'],
            columnNames: ['appointment_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
        indices: [
          { columnNames: ['status'], isUnique: false },
          { columnNames: ['participant'], isUnique: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments_events');
  }
}
