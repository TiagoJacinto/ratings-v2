import { type Result, err, ok } from "@primitivestack/core";

type Props = {
	name: string;
	description?: string;
};

export class ValidationException {}

export class Category {
	name: string;
	description?: string;
	static create(params: Props): Result<Category, ValidationException> {
		if (params.name.length < 1) return err(new ValidationException());

		return ok(new Category(params));
	}

	private constructor({ name, description }: Props) {
		this.name = name;
		this.description = description;
	}
}
