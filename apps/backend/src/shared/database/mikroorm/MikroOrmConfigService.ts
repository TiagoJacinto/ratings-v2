import type {
	MikroOrmModuleOptions,
	MikroOrmOptionsFactory,
} from "@mikro-orm/nestjs";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { getMikroORMConfig } from "./utils/getMikroORMConfig";

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}
	createMikroOrmOptions(): MikroOrmModuleOptions<PostgreSqlDriver> {
		return getMikroORMConfig({
			host: this.configService.get("DATABASE_HOST"),
			port: this.configService.get("DATABASE_PORT"),
			user: this.configService.get("DATABASE_USERNAME"),
			password: this.configService.get("DATABASE_PASSWORD"),
			dbName: this.configService.get("DATABASE_NAME"),
		});
	}
}
