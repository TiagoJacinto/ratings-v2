import {
	Body,
	ConflictException,
	Controller,
	Inject,
	InternalServerErrorException,
	Post,
} from "@nestjs/common";

import { CreateCategoryMutationRequest } from "@/gen";

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

		throw new InternalServerErrorException();
	}
}
