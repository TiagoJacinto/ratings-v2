import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category/category.repository';
import { Category, ValidationException } from '../domain/category';
import { ok, err, Result } from '@primitivestack/core';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

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
