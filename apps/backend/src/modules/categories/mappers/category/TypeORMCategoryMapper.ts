import { Category } from "../../domain/category";
import { Category as CategoryEntity } from "../../infra/entities/category.db.typeorm.entity";

export const toPersistence = (domain: Category) =>
	CategoryEntity.create(domain);
export const toDomain = (entity: CategoryEntity) => Category.create(entity);
