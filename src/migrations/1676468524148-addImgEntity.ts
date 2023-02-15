import { MigrationInterface, QueryRunner } from "typeorm";

export class addImgEntity1676468524148 implements MigrationInterface {
    name = 'addImgEntity1676468524148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL, "link" character varying NOT NULL, "announcementId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "imgFront"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "imgsGallery"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "imgMain" character varying`);
        await queryRunner.query(`ALTER TABLE "bids" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "img" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_15f2ebe082a6e43a960f9f88411" UNIQUE ("cellphone")`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_15f2ebe082a6e43a960f9f88411"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "img"`);
        await queryRunner.query(`ALTER TABLE "bids" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "imgMain"`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "imgsGallery" character varying`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "imgFront" character varying`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
