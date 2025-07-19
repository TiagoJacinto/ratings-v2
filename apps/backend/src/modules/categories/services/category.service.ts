import { Inject, Injectable } from "@nestjs/common";
import { err, ok, type Result } from "@primitivestack/core";
import { Category, type ValidationException } from "../domain/category";
import type { CreateCategoryDTO } from "../dtos/create-category.dto";
import { CategoryRepository } from "../repositories/category/category.repository";

export class CategoryAlreadyExistsException {}

export type CreateCategoryResult = Result<
	undefined,
	CategoryAlreadyExistsException | ValidationException
>;

@Injectable()
export class CategoryService {
	constructor(
		@Inject(CategoryRepository)
		private readonly categoryRepository: CategoryRepository,
	) {}

	async createCategory(dto: CreateCategoryDTO): Promise<CreateCategoryResult> {
		if (await this.categoryRepository.existsByName(dto.name))
			return err(new CategoryAlreadyExistsException());

		const categoryOrException = Category.create(dto);
		if (!categoryOrException.isOk) return categoryOrException;

		await this.categoryRepository.save(categoryOrException.value);

		return ok();
	}
}
