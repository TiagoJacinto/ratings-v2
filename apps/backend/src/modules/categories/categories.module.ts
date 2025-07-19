import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CategoryController } from "./infra/controllers/category.controller";
import { Category } from "./infra/entities/category.db.mikroorm.entity";
import { CategoryRepository } from "./repositories/category/category.repository";
import { MikroORMCategoryRepository } from "./repositories/category/MikroORMCategoryRepository";
import { CategoryService } from "./services/category.service";

@Module({
	imports: [MikroOrmModule.forFeature([Category])],
	controllers: [CategoryController],
	providers: [
		CategoryService,
		{
			provide: CategoryRepository,
			useClass: MikroORMCategoryRepository,
		},
	],
})
export class CategoriesModule {}
