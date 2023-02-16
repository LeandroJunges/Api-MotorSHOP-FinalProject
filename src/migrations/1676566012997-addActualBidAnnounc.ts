import { MigrationInterface, QueryRunner } from "typeorm";

export class addActualBidAnnounc1676566012997 implements MigrationInterface {
    name = 'addActualBidAnnounc1676566012997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" ADD "actualBid" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "actualBid"`);
    }

}
