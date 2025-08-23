import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as OpenApiValidator from "express-openapi-validator";

import { CategoriesModule } from "./modules/categories/categories.module";
import { DatabaseModule } from "./shared/database/database.module";
import { validateEnv } from "./shared/config/env.validation";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: validateEnv,
		}),
		DatabaseModule,
		CategoriesModule,
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				...OpenApiValidator.middleware({
					ajvFormats: { mode: "full" },
					apiSpec: require.resolve(
						"@repo/contract/tsp-output/schema/openapi.1.0.yaml",
					),
					validateFormats: true,
					validateRequests: {
						allowUnknownQueryParameters: true,
						coerceTypes: false,
					},
					validateResponses: true
				}),
			)
			.forRoutes("*");
	}
}
