import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Repository } from 'typeorm';
import { TypeORMCategoryMapper } from '../../mappers/category/TypeORMCategoryMapper';
import { Category } from '../../infra/entities/category.db.typeorm.entity';

export class TypeORMCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly baseRepository: Repository<Category>,
  ) {}

  async save(category: Category) {
    await this.baseRepository.save(
      TypeORMCategoryMapper.toPersistence(category),
    );
  }

  existsByName(name: string) {
    return this.baseRepository.existsBy({ name });
  }
}
