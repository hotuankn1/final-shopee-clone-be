import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUser1695863605808 implements MigrationInterface {
    name = 'AlterTableUser1695863605808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    }

}
