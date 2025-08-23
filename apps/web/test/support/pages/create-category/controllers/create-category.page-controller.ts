import type { Category as CreateCategoryDTO, ServerFailure } from "@src/gen";
import type { PageController } from "@primitivestack/frontend-testing-core";
import { ServerSuccess } from "@src/gen";

export interface CreateCategoryPageController extends PageController {
	enterCategoryDetails(command: CreateCategoryDTO): Promise<void>;

	submitForm(): Promise<void>;

	showsSuccessToastWithMessage(
		response: ServerSuccess,
	): Promise<boolean>;

	showsErrorToastWithMessage(
		response: ServerFailure,
	): Promise<boolean>;

	hasNameFormError(): Promise<boolean>;

	hasDescriptionFormError(): Promise<boolean>;
}
