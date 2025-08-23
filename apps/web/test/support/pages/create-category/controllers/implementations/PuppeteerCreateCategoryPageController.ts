import type {
	Category as CreateCategoryDTO,
	ServerFailure,
	ServerSuccess,
} from "@src/gen";
import { CreateCategoryPageController } from "../create-category.page-controller";
import { SuccessResponse, ErrorResponse } from "@src/shared/api/client";
import {createCategoryPage,toaster} from "@src/shared/app.config";
import {
	Driver,
	PageController,
	toElements,
} from "@primitivestack/frontend-testing-puppeteer";

export class PuppeteerCreateCategoryPageController
	extends PageController
	implements CreateCategoryPageController
{
	protected readonly url = "http://localhost:3000/categories/create";
	private readonly elements;

	constructor(driver: Driver) {
		super(driver);
		this.elements = toElements(
			{ ...createCategoryPage, ...toaster },
			driver,
		);
	}

	async enterCategoryDetails(command: CreateCategoryDTO) {
		await this.elements.nameInput
			.waitForByLabelText()
			.then((e) => e?.type(command.name));
		if (command.description)
			await this.elements.descriptionInput
				.waitForByLabelText()
				.then((e) => e?.type(command.description!));
	}

	async submitForm() {
		await this.elements.submit.waitForByText().then((e) => e?.click());
	}

	async hasNameFormError() {
		const handler = await this.elements.nameMessage.waitFor();

		return Boolean(await handler?.evaluate((e) => e.textContent));
	}

	async hasDescriptionFormError() {
		const handler = await this.elements.descriptionMessage.find();

		return Boolean(await handler?.evaluate((e) => e.textContent));
	}

	async showsSuccessToastWithMessage({ message }: ServerSuccess) {
		const textContent = await this.elements.successToast
			.waitForByText(message)
			.then((h) => h?.evaluate((e) => e.textContent));

		return textContent === message;
	}

	async showsErrorToastWithMessage({ message }: ServerFailure) {
		const textContent = await this.elements.errorToast
			.waitForByText(message)
			.then((h) => h?.evaluate((e) => e.textContent));

		return textContent === message;
	}
}
