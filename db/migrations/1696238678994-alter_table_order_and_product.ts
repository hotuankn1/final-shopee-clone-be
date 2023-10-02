import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOrderAndProduct1696238678994 implements MigrationInterface {
    name = 'AlterTableOrderAndProduct1696238678994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "purchasedDate"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "purchasedDate" TIMESTAMP WITH TIME ZONE NOT NULL`);

        await queryRunner.query(`UPDATE "product" SET "series" = '1' WHERE "series" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "series" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "series"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "series" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "purchasedDate"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "purchasedDate" TIMESTAMP NOT NULL`);
    }

}
