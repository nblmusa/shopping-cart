import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCarts1622202869664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE carts (
                id char(36) NOT NULL,
                product_id varchar(255) NOT NULL,
                user_id varchar(255) NOT NULL,
                quantity int(11) NOT NULL DEFAULT 1,
                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp NULL,
                PRIMARY KEY (id),
                CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id),
                CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
                INDEX (product_id, user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS carts;`);
  }
}
