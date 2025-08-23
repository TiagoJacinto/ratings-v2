import { type Result, err, ok } from "@primitivestack/core";
import { type ZodError } from "zod";

import { categorySchema } from "@/gen";

type Props = {
	name: string;
	description?: string;
};

export class Category {
	name: string;
	description?: string;
	static create(params: Props): Result<Category, ZodError> {
		const { error } = categorySchema.safeParse(params);
		if (error) return err(error);

		return ok(new Category(params));
	}

	private constructor({ name, description }: Props) {
		this.name = name;
		this.description = description;
	}
}
