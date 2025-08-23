import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { error } from "express-openapi-validator";

@Catch(...Object.values(error))
export class OpenApiExceptionFilter implements ExceptionFilter {
	catch(error: ValidationError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		response
			.status(error.status)
			.header(error.headers)
			.json({ ...error, code: getCode(error), message: error.message });
	}
}

interface ValidationError {
	name: string;
	errors: {
		error_code?: string;
		message: string;
		path: string;
	}[];
	headers?: Record<string, string>;
	message: string;
	path?: string;
	status: number;
}

const { BadRequest } = error;

function getCode(error: ValidationError) {
	if (error instanceof BadRequest) return "BODY_VALIDATION_EXCEPTION";

	return undefined;
}
