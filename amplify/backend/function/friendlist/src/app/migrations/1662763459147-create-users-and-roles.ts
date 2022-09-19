import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersAndRoles1662763459147 implements MigrationInterface {
    name = 'createUsersAndRoles1662763459147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles" ("user" uuid NOT NULL, "role" uuid NOT NULL, CONSTRAINT "PK_55df5eb63e937fa8e0063e951e6" PRIMARY KEY ("user", "role"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb8e6f233f2f01e2fc768bec1c" ON "users_roles" ("user") `);
        await queryRunner.query(`CREATE INDEX "IDX_07f7b2d43de43962cd118145d7" ON "users_roles" ("role") `);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_cb8e6f233f2f01e2fc768bec1c3" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_07f7b2d43de43962cd118145d70" FOREIGN KEY ("role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_07f7b2d43de43962cd118145d70"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_cb8e6f233f2f01e2fc768bec1c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07f7b2d43de43962cd118145d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb8e6f233f2f01e2fc768bec1c"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
