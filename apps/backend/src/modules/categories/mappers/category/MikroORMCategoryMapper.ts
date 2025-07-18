import { Category } from '../../domain/category';
import { Category as CategoryEntity } from '../../infra/entities/category.db.mikroorm.entity';

export class MikroORMCategoryMapper {
  static toPersistence(domain: Category) {
    return new CategoryEntity(domain);
  }

  static toDomain(entity: CategoryEntity) {
    return Category.create(entity);
  }
}
