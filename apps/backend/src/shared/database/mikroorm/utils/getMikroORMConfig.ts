import { defineConfig } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export const getMikroORMConfig = ({
	host,
	port,
	user,
	password,
	dbName,
}: {
	host: string | undefined;
	port: number | undefined;
	user: string | undefined;
	password: string | undefined;
	dbName: string | undefined;
}) =>
	defineConfig({
		driver: PostgreSqlDriver,
		entities: ["./dist/modules/**/infra/entities/*.mikroorm.entity.js"],
		entitiesTs: ["./src/modules/**/infra/entities/*.mikroorm.entity.ts"],
		metadataProvider: TsMorphMetadataProvider,
		host,
		port,
		user,
		password,
		dbName,
		migrations: {
			path: "./src/shared/database/migrations",
			pathTs: "./src/shared/database/migrations",
			transactional: true,
			disableForeignKeys: false,
			allOrNothing: true,
			dropTables: true,
			safe: false,
			emit: "ts",
		},
	});
