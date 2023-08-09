import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersTypesUsers1690695502740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_types_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'user_type_id',
            type: 'int',
          },
          {
            name: 'roles',
            type: 'varchar',
            isArray: true,
            isNullable: true,
            default: 'array[]::varchar[]',
          },
          {
            name: 'permissions',
            type: 'varchar',
            isArray: true,
            isNullable: true,
            default: 'array[]::varchar[]',
          },
          {
            name: 'confirm',
            type: 'boolean',
            default: false,
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
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
            name: 'FKUsersTypesUsers',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKUsersUsersTypes',
            referencedTableName: 'types_users',
            referencedColumnNames: ['id'],
            columnNames: ['user_type_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
        indices: [
          {
            columnNames: ['user_id', 'user_type_id'],
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_types_users');
  }
}
