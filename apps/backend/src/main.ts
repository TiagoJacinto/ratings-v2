import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Ratings API")
		.setVersion("1.0")
		.build();

	SwaggerModule.setup("api", app, () =>
		SwaggerModule.createDocument(app, config),
	);

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
