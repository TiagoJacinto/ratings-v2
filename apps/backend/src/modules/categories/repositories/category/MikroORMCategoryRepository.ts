import { InjectRepository } from '@mikro-orm/nestjs';
import { CategoryRepository } from './category.repository';
import { EntityRepository } from '@mikro-orm/core';
import { Category } from '../../infra/entities/category.db.mikroorm.entity';
import { MikroORMCategoryMapper } from '../../mappers/category/MikroORMCategoryMapper';

export class MikroORMCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly baseRepository: EntityRepository<Category>,
  ) {}

  async save(category: Category) {
    await this.baseRepository.upsert(
      MikroORMCategoryMapper.toPersistence(category),
    );
  }

  async existsByName(name: string) {
    const category = await this.baseRepository.findOne({
      name,
    });

    return !!category;
  }
}
