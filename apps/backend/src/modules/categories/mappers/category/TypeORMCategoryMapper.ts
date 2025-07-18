import { Category } from '../../domain/category';
import { Category as CategoryEntity } from '../../infra/entities/category.db.typeorm.entity';

export class TypeORMCategoryMapper {
  static toPersistence(domain: Category) {
    return CategoryEntity.create(domain);
  }

  static toDomain(entity: CategoryEntity) {
    return Category.create(entity);
  }
}
