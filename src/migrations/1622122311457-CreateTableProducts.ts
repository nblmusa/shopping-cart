import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1622122311457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE products (
                id char(36) NOT NULL,
                name varchar(255) NOT NULL,
                description varchar(255) NOT NULL,
                category_id varchar(255) NOT NULL,
                selling_price float NOT NULL DEFAULT 0.0,
                stock_level int(11) NOT NULL DEFAULT 0,
                expiration_date timestamp NULL,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NULL,
                PRIMARY KEY (id),
                CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id),
                INDEX (category_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS products;`);
  }
}
