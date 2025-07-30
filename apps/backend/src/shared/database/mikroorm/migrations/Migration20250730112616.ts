import { Migration } from '@mikro-orm/migrations';

export class Migration20250730112616 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "category" ("id" serial primary key, "name" varchar(100) not null, "description" text null);`);
  }

}
