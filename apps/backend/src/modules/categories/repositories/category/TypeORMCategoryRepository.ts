import type { Repository } from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";

import type { CategoryRepository } from "./category.repository";

import { Category } from "../../infra/entities/category.db.typeorm.entity";
import * as TypeORMCategoryMapper from "../../mappers/category/TypeORMCategoryMapper";

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
