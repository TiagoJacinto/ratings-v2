import { Module } from "@nestjs/common";

import { CategoriesModule } from "./modules/categories/categories.module";
import { SharedModule } from "./shared/shared.module";

@Module({
	imports: [SharedModule, CategoriesModule],
})
export class AppModule {}
