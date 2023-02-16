import { MigrationInterface, QueryRunner } from "typeorm";

export class addingUserIsActive1676472522453 implements MigrationInterface {
    name = 'addingUserIsActive1676472522453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdvertiser" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdvertiser" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
