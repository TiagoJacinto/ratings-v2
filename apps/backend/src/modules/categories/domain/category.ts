import { err, ok, type Result } from "@primitivestack/core";

type Props = {
	name: string;
	description?: string;
};

export class ValidationException {}

export class Category {
	name: string;
	description?: string;
	private constructor({ name, description }: Props) {
		this.name = name;
		this.description = description;
	}

	static create(params: Props): Result<Category, ValidationException> {
		if (params.name.length < 1) return err(new ValidationException());

		return ok(new Category(params));
	}
}
