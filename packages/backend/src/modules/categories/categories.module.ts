import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category/category.repository';
import { CategoryController } from './infra/controllers/category.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from './infra/entities/category.db.mikroorm.entity';
import { MikroORMCategoryRepository } from './repositories/category/MikroORMCategoryRepository';

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
