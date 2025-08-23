import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";

import { validateEnv } from "./config/env.validation";
import { ValidationModule } from "./validation/validation.module";
import { DatabaseModule } from "./database/database.module";
import { HttpExceptionFilter } from "./filters/http.exception-filter";
import { OpenApiExceptionFilter } from "./filters/openapi.exception-filter";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: validateEnv,
		}),
		ValidationModule,
		DatabaseModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: OpenApiExceptionFilter,
		},
	],
})
export class SharedModule {}
