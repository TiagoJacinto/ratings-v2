import * as gen from "@src/gen";
import { autoBindCreateCategorySteps, CategoryName } from "@repo/features";
import { CreateCategoryPageController } from "@test/support/pages/create-category/controllers/create-category.page-controller";
import { RTLCreateCategoryPageController } from "@test/support/pages/create-category/controllers/implementations/RTLCreateCategoryPageController";

autoBindCreateCategorySteps(
	[
		({ given, then, when }) => {
			let page: CreateCategoryPageController;

			beforeAll(async () => {
				page = new RTLCreateCategoryPageController()
			});

			beforeEach(async () => {
				await page.open();
			});

			given("I am a user", () => {});

			const successResponse = {
				status: "SUCCESS",
				message: "Success",
			} as const;

			when("I create a category with valid category details", async () => {
				await page.enterCategoryDetails({
					name: "Category",
					description: "Description1",
				});

				vi.spyOn(gen, "createCategory").mockResolvedValue(successResponse);

				await page.submitForm();
			});

			then("I should see a success message", async () => {
				expect(await page.showsSuccessToastWithMessage(successResponse)).toBe(
					true,
				);
			});

			const invalidDetailsErrorResult = {
				status: "ERROR",
				code: "BODY_VALIDATION_EXCEPTION",
				errors: [
					{
						path: "name",
						message: "Invalid name",
					},
				],
				message: "Invalid",
			} as const;

			when("I register with invalid category details", async () => {
				vi.spyOn(gen, "createCategory").mockResolvedValue(
					invalidDetailsErrorResult,
				);

				await page.submitForm();
			});

			then(
				"I should see an error notifying me that my input is invalid",
				async () => {
					expect(await page.hasNameFormError()).toBe(true);
					expect(await page.hasDescriptionFormError()).toBe(false);
				},
			);

			const alreadyCreatedErrorResponse = {
				status: "ERROR",
				message: "Category Already Created",
			} as const;

			given(/^a already created category with name: (.*)$/, () => {
				vi.spyOn(gen, "createCategory").mockResolvedValue(
					alreadyCreatedErrorResponse,
				);
			});

			when(/^I attempt to create a category with name: (.*)$/, async (arg0) => {
				const name = CategoryName.parse(arg0);

				await page.enterCategoryDetails({ name });
				await page.submitForm();
			});

			then(
				"I should see an error for each category notifying me that the category already exists",
				async () => {
					expect(
						await page.showsErrorToastWithMessage(alreadyCreatedErrorResponse),
					).toBe(true);
				},
			);
		},
	],
	{
		tagFilter: "@frontend",
	},
);
