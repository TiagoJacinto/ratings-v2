import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ConfigModule } from "@nestjs/config";

import { MikroOrmConfigService } from "./mikroorm/MikroOrmConfigService";

@Module({
	imports: [
		MikroOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: MikroOrmConfigService,
		}),
	],
})
export class DatabaseModule {}
