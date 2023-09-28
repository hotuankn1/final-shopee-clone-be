import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUser1695870610834 implements MigrationInterface {
    name = 'AlterTableUser1695870610834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" integer NOT NULL`);
    }

}
