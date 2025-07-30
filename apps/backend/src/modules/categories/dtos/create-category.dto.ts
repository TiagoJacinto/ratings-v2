import type { CreateCategoryDTO as BaseDTO } from "@repo/data/src/categories";

import { IsString } from "class-validator";

export class CreateCategoryDTO implements BaseDTO {
	@IsString()
	name!: string;
	description?: string;
}
