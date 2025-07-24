import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
} from "@nestjs/common";

import type { CreateCategoryDTO } from "../../dtos/create-category.dto";

import { ValidationException } from "../../domain/category";
import {
	CategoryAlreadyExistsException,
	type CategoryService,
} from "../../services/category.service";

@Controller("categories")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() dto: CreateCategoryDTO) {
		const result = await this.categoryService.createCategory(dto);
		if (result.isOk) return;

		const { error } = result;

		if (error instanceof CategoryAlreadyExistsException)
			throw new ConflictException();

		if (error instanceof ValidationException) throw new BadRequestException();
	}
}
