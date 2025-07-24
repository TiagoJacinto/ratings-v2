import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { CategoryController } from "./infra/controllers/category.controller";
import { Category } from "./infra/entities/category.db.mikroorm.entity";
import { MikroORMCategoryRepository } from "./repositories/category/MikroORMCategoryRepository";
import { CategoryRepository } from "./repositories/category/category.repository";
import { CategoryService } from "./services/category.service";

@Module({
	controllers: [CategoryController],
	imports: [MikroOrmModule.forFeature([Category])],
	providers: [
		CategoryService,
		{
			provide: CategoryRepository,
			useClass: MikroORMCategoryRepository,
		},
	],
})
export class CategoriesModule {}
