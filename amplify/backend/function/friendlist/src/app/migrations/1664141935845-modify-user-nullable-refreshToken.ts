import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyUserNullableRefreshToken1664141935845 implements MigrationInterface {
    name = 'modifyUserNullableRefreshToken1664141935845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "refreshToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

}
