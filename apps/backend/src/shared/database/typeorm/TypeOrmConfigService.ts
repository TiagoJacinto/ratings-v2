import { Injectable } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type {
	TypeOrmModuleOptions,
	TypeOrmOptionsFactory,
} from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			host: this.configService.get("DATABASE_HOST"),
			port: this.configService.get("DATABASE_PORT"),
			username: this.configService.get("DATABASE_USERNAME"),
			password: this.configService.get("DATABASE_PASSWORD"),
			database: this.configService.get("DATABASE_NAME"),
			migrations: ["shared/database/migrations/*.ts"],
			autoLoadEntities: true,
			synchronize: false,
		};
	}
}
