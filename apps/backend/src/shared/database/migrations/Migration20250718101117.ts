import { Migration } from "@mikro-orm/migrations";

export class Migration20250718101117 extends Migration {
	override up() {
		this.addSql(
			`create table "category" ("id" serial primary key, "name" varchar(100) not null, "description" text null);`,
		);
	}
}
