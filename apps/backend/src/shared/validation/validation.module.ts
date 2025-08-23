import { MiddlewareConsumer, Module } from "@nestjs/common";
import * as OpenApiValidator from "express-openapi-validator";

@Module({})
export class ValidationModule {
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
					validateResponses: true,
				}),
			)
			.forRoutes("*");
	}
}
