import { BadRequestException, type PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodSchema) {}

	transform(value: unknown) {
		try {
			return this.schema.parse(value);
		} catch {
			throw new BadRequestException("Validation failed");
		}
	}
}
