import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTodoId1701177921242 implements MigrationInterface {
  name = 'ChangeTodoId1701177921242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "todoListId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "todoListId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
