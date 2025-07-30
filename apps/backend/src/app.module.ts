import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

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
export class AppModule {}
