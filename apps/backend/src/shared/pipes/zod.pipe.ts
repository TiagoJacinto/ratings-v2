import type { ZodType } from "zod";

import { BadRequestException, type PipeTransform } from "@nestjs/common";

export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodType) {}

	transform(value: unknown) {
		try {
			return this.schema.parse(value);
		} catch {
			throw new BadRequestException("Validation failed");
		}
	}
}
