import {
	autoBindCreateCategorySteps,
	type CreateCategoryDataTable,
	CreateCategoryDataTableSchema,
} from "@repo/features";
import type { Mocked } from "@suites/doubles.jest";
import { TestBed } from "@suites/unit";
import { ValidationException } from "@/modules/categories/domain/category";
import { CategoryRepository } from "@/modules/categories/repositories/category/category.repository";
import {
	CategoryAlreadyExistsException,
	CategoryService,
	type CreateCategoryResult,
} from "@/modules/categories/services/category.service";

autoBindCreateCategorySteps(
	[
		({ given, when, then }) => {
			let categoryService: CategoryService;
			let categoryRepository: Mocked<CategoryRepository>;

			beforeAll(async () => {
				const { unit, unitRef } =
					await TestBed.solitary(CategoryService).compile();

				categoryService = unit;

				categoryRepository = unitRef.get(CategoryRepository);

				// const moduleFixture = await Test.createTestingModule({
				//   imports: [AppModule],
				// }).compile();

				// categoryService = moduleFixture.get(CategoryService);
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
					expect(result.unwrapped).toBeInstanceOf(ValidationException);
				},
			);

			let categories: CreateCategoryDataTable;

			given("a set of already created categories", (table) => {
				categories = CreateCategoryDataTableSchema.parse(table);

				categoryRepository.existsByName.mockResolvedValue(true);

				// for (const category of categories)
				//   await categoryService.createCategory(category);
			});

			const results: CreateCategoryResult[] = [];

			when("I attempt to create categories with those names", async () => {
				for (const category of categories)
					results.push(await categoryService.createCategory(category));
			});

			then(
				"I should see an error for each category notifying me that the category already exists",
				() => {
					for (const result of results) {
						expect(result.isOk).toBe(false);
						expect(result.unwrapped).toBeInstanceOf(
							CategoryAlreadyExistsException,
						);
					}
				},
			);
		},
	],
	{
		tagFilter: "@backend",
	},
);
