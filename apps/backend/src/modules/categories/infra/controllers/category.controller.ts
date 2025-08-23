import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Inject,
	Post,
} from "@nestjs/common";

import { CreateCategoryMutationRequest } from "@/gen";

import { ValidationException } from "../../domain/category";
import {
	CategoryAlreadyExistsException,
	CategoryService,
} from "../../services/category.service";

@Controller("categories")
export class CategoryController {
	constructor(
		@Inject(CategoryService)
		private readonly categoryService: CategoryService,
	) {}

	@Post()
	async create(@Body() dto: CreateCategoryMutationRequest) {
		const result = await this.categoryService.createCategory(dto);
		if (result.isOk) return { message: "Category created successfully" };

		const { error } = result;

		if (error instanceof CategoryAlreadyExistsException)
			throw new ConflictException(error.message);

		if (error instanceof ValidationException) throw new BadRequestException();
	}
}
