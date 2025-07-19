import type { Category } from "../../domain/category";

export const CategoryRepository = Symbol("CategoryRepository");

export interface CategoryRepository {
	save(category: Category): Promise<void>;
	existsByName(name: string): Promise<boolean>;
}
