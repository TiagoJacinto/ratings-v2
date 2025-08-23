import type { Mocked } from "@suites/doubles.jest";

import { autoBindCreateCategorySteps, CategoryName } from "@repo/features";
import { TestBed } from "@suites/unit";
import { ZodError } from "zod";

import { CategoryRepository } from "@/modules/categories/repositories/category/category.repository";
import {
	type CreateCategoryResult,
	CategoryAlreadyExistsException,
	CategoryService,
} from "@/modules/categories/services/category.service";

autoBindCreateCategorySteps(
	[
		({ given, then, when }) => {
			let categoryService: CategoryService;
			let categoryRepository: Mocked<CategoryRepository>;

			beforeAll(async () => {
				const { unit, unitRef } =
					await TestBed.solitary(CategoryService).compile();

				categoryService = unit;

				categoryRepository = unitRef.get(CategoryRepository);
			});

			given("I am a user", () => {});

			let result: CreateCategoryResult;

			when("I create a category with valid category details", async () => {
				result = await categoryService.createCategory({
					name: "Category",
					description: "Description1",
				});
			});
			then("I should see a success message", () => {
				expect(result.isOk).toBe(true);
				expect(result.unwrapped).toBeUndefined();
			});

			when("I register with invalid category details", async () => {
				result = await categoryService.createCategory({
					name: "",
				});
			});

			then(
				"I should see an error notifying me that my input is invalid",
				() => {
					expect(result.isOk).toBe(false);
					expect(result.unwrapped).toBeInstanceOf(ZodError);
				},
			);

			given(/^a already created category with name: (.*)$/, () => {
				categoryRepository.existsByName.mockResolvedValue(true);
			});

			when(
				/^I attempt to create a category with name: (.*)$/,
				async (unparsedName) => {
					const name = CategoryName.parse(unparsedName);

					result = await categoryService.createCategory({ name });
				},
			);

			then(
				"I should see an error for each category notifying me that the category already exists",
				() => {
					expect(result.isOk).toBe(false);
					expect(result.unwrapped).toBeInstanceOf(
						CategoryAlreadyExistsException,
					);
				},
			);
		},
	],
	{
		tagFilter: "@backend",
	},
);
