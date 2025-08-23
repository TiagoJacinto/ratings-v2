import { Inject, Injectable } from "@nestjs/common";
import { type Result, err, ok } from "@primitivestack/core";

import { Category as CreateCategoryDTO } from "@/gen";

import { type ValidationException, Category } from "../domain/category";
import { CategoryRepository } from "../repositories/category/category.repository";

export class CategoryAlreadyExistsException {
	message = "Category already exists";
}

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
