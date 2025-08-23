import type TestAgent from "supertest/lib/agent";
import type { App } from "supertest/types";

import { type INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { CategoryName, autoBindCreateCategorySteps } from "@repo/features";
import * as request from "supertest";
import { type SetFieldType } from "type-fest";

import { CategoriesModule } from "@/modules/categories/categories.module";
import { type CreateCategory400, type CreateCategoryMutation } from "@/gen";
import { SharedModule } from "@/shared/shared.module";

import { DatabaseFixture } from "../../support/fixtures/database.fixture";

const CATEGORIES_ENDPOINT = "/categories";

type StrictResponse<TBody> = SetFieldType<request.Response, "body", TBody>;

autoBindCreateCategorySteps(
	[
		({ given, then, when }) => {
			let agent: TestAgent;
			let nestApp: INestApplication<App>;
			let dbFixture: DatabaseFixture;

			beforeAll(async () => {
				const moduleFixture = await Test.createTestingModule({
					imports: [SharedModule, CategoriesModule],
				}).compile();

				nestApp = moduleFixture.createNestApplication();
				dbFixture = new DatabaseFixture(nestApp);
				await nestApp.init();

				agent = request(nestApp.getHttpServer());
			});

			beforeEach(async () => {
				await dbFixture.resetDatabase();
			});

			afterAll(async () => {
				await nestApp.close();
			});

			given("I am a user", () => {});

			let response: StrictResponse<
				CreateCategoryMutation["Response"] | CreateCategoryMutation["Errors"]
			>;

			when("I create a category with valid category details", async () => {
				response = await agent.post(CATEGORIES_ENDPOINT).send({
					name: "Category",
					description: "Description",
				});
			});
			then("I should see a success message", () => {
				expect(response.statusCode).toBe(HttpStatus.CREATED);
				expect(typeof response.body.message === "string").toBe(true);
			});

			when("I register with invalid category details", async () => {
				response = await agent.post(CATEGORIES_ENDPOINT).send({
					name: "",
				});
			});
			then(
				"I should see an error notifying me that my input is invalid",
				() => {
					expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
					expect((response.body as CreateCategory400).code).toBe(
						"BODY_VALIDATION_EXCEPTION",
					);
					expect(typeof response.body.message === "string").toBe(true);
				},
			);

			given(
				/^a already created category with name: (.*)$/,
				async (unparsedName) => {
					const name = CategoryName.parse(unparsedName);

					await agent.post(CATEGORIES_ENDPOINT).send({ name });
				},
			);

			when(
				/^I attempt to create a category with name: (.*)$/,
				async (unparsedName) => {
					const name = CategoryName.parse(unparsedName);

					response = await agent.post(CATEGORIES_ENDPOINT).send({ name });
				},
			);

			then(
				"I should see an error for each category notifying me that the category already exists",
				() => {
					expect(response.statusCode).toBe(HttpStatus.CONFLICT);
					expect(typeof response.body.message === "string").toBe(true);
				},
			);
		},
	],
	{
		tagFilter: "@backend",
	},
);
