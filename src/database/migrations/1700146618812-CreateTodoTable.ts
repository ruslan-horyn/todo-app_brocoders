import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodoTable1700146618812 implements MigrationInterface {
  name = 'CreateTodoTable1700146618812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "completed" boolean NOT NULL, "todoListId" integer NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), "deletedat" TIMESTAMP, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo_list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), "deletedat" TIMESTAMP, CONSTRAINT "PK_1a5448d48035763b9dbab86555b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_list" ADD CONSTRAINT "FK_0ccba8168dcb33ca73fd63e0c73" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo_list" DROP CONSTRAINT "FK_0ccba8168dcb33ca73fd63e0c73"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`,
    );
    await queryRunner.query(`DROP TABLE "todo_list"`);
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
