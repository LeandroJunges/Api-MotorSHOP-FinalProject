import { MigrationInterface, QueryRunner } from "typeorm";

export class addDelCascadeBidsAnn1676578918727 implements MigrationInterface {
    name = 'addDelCascadeBidsAnn1676578918727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_41ed5bd3956a8082d8caae3eb7c"`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_41ed5bd3956a8082d8caae3eb7c" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_41ed5bd3956a8082d8caae3eb7c"`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_41ed5bd3956a8082d8caae3eb7c" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
