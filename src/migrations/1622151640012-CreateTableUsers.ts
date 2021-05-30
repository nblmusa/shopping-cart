import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1622151640012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (
            id char(36) NOT NULL,
            firstName varchar(255) NOT NULL,
            lastName varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            role varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            PRIMARY KEY (id),
            INDEX (email, role)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
