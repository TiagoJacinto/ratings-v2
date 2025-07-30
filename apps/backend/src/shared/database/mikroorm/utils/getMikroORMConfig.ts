import { defineConfig } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export const getMikroORMConfig = ({
	dbName,
	host,
	password,
	port,
	user,
}: {
	dbName: string | undefined;
	host: string | undefined;
	password: string | undefined;
	port: number | undefined;
	user: string | undefined;
}) =>
	defineConfig({
		dbName,
		driver: PostgreSqlDriver,
		entities: ["./dist/modules/**/infra/entities/*.mikroorm.entity.js"],
		entitiesTs: ["./src/modules/**/infra/entities/*.mikroorm.entity.ts"],
		host,
		metadataProvider: TsMorphMetadataProvider,
		migrations: {
			allOrNothing: true,
			disableForeignKeys: false,
			dropTables: true,
			emit: "ts",
			path: "./src/shared/database/mikroorm/migrations",
			pathTs: "./src/shared/database/mikroorm/migrations",
			safe: false,
			transactional: true,
		},
		password,
		port,
		user,
	});
