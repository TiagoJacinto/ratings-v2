import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { OpenApiExceptionFilter } from "./shared/filters/openapi.exception-filter";
import { HttpExceptionFilter } from "./shared/filters/http.exception-filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new HttpExceptionFilter(), new OpenApiExceptionFilter());
	app.useGlobalPipes(new ValidationPipe());

	const port = process.env.PORT ?? 8080;

	await app.listen(port);

	console.log(`Running server in ${port} port`);
}
void bootstrap();
