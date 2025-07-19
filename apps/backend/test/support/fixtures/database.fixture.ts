import { type ISchemaGenerator, MikroORM } from "@mikro-orm/core";
import type { INestApplication } from "@nestjs/common";

export class DatabaseFixture {
	private readonly schemaGenerator: ISchemaGenerator;

	constructor(app: INestApplication) {
		const orm = app.get(MikroORM);
		this.schemaGenerator = orm.getSchemaGenerator();
	}

	async resetDatabase() {
		await this.schemaGenerator.clearDatabase();
	}
}
