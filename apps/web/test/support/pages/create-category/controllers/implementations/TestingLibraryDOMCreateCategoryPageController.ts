import { type Category as CreateCategoryDTO, type ServerFailure, type ServerSuccess } from "@src/gen";
import { CreateCategoryPageController } from "../create-category.page-controller";
import { ErrorResponse, SuccessResponse } from "@src/shared/api/client";
import {createCategoryPage, toaster} from "@src/shared/app.config";
import { PageController, Screen } from "@primitivestack/frontend-testing-library-dom";

const elements = {...createCategoryPage, ...toaster}
type Elements = typeof elements

export abstract class TestingLibraryDOMCreateCategoryPageController extends PageController<Elements> implements CreateCategoryPageController {
	constructor(
    screen: Screen
	) {
    super(elements, screen)
	}

	async enterCategoryDetails(command: CreateCategoryDTO) {
		await this.elements.nameInput.getByLabelText().events.type(command.name);
		if (command.description)
			await this.elements.descriptionInput.getByLabelText().events.type(command.description);
	}

	async submitForm() {
		await this.elements.submit.getByText().events.click();
	}

	async hasNameFormError() {
    const { element } = await this.elements.nameMessage.waitForByTitle()
		return Boolean(element.textContent);
	}

	async hasDescriptionFormError() {
    const handler = this.elements.descriptionMessage.findByTitle()

		return Boolean(handler?.element.textContent);
	}

	async showsSuccessToastWithMessage({ message }: SuccessResponse<ServerSuccess>) {
		return Boolean(await this.elements.successToast.waitForByText(message))
	}

	async showsErrorToastWithMessage({ message }: ErrorResponse<ServerFailure>) {
		return Boolean(await this.elements.errorToast.waitForByText(message))
	}
}
