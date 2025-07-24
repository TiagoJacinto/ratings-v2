import type { ConfigService } from "@nestjs/config";
import type {
	TypeOrmModuleOptions,
	TypeOrmOptionsFactory,
} from "@nestjs/typeorm";

import { Injectable } from "@nestjs/common";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			autoLoadEntities: true,
			database: this.configService.get("DATABASE_NAME"),
			host: this.configService.get("DATABASE_HOST"),
			migrations: ["shared/database/migrations/*.ts"],
			password: this.configService.get("DATABASE_PASSWORD"),
			port: this.configService.get("DATABASE_PORT"),
			synchronize: false,
			type: "postgres",
			username: this.configService.get("DATABASE_USERNAME"),
		};
	}
}
