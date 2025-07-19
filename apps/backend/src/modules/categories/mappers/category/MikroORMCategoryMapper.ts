import { Category } from "../../domain/category";
import { Category as CategoryEntity } from "../../infra/entities/category.db.mikroorm.entity";

export const toPersistence = (domain: Category) => new CategoryEntity(domain);
export const toDomain = (entity: CategoryEntity) => Category.create(entity);
