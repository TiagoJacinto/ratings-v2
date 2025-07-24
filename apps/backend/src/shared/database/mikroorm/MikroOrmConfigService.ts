import type {
	MikroOrmModuleOptions,
	MikroOrmOptionsFactory,
} from "@mikro-orm/nestjs";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import type { ConfigService } from "@nestjs/config";

import { Injectable } from "@nestjs/common";

import { getMikroORMConfig } from "./utils/getMikroORMConfig";

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createMikroOrmOptions(): MikroOrmModuleOptions<PostgreSqlDriver> {
		return getMikroORMConfig({
			dbName: this.configService.get("DATABASE_NAME"),
			host: this.configService.get("DATABASE_HOST"),
			password: this.configService.get("DATABASE_PASSWORD"),
			port: this.configService.get("DATABASE_PORT"),
			user: this.configService.get("DATABASE_USERNAME"),
		});
	}
}
