import { loadEnv } from "@/shared/config/env.validation";

import { getMikroORMConfig } from "./utils/getMikroORMConfig";

const env = loadEnv();
export default getMikroORMConfig({
	dbName: env.DATABASE_NAME,
	host: env.DATABASE_HOST,
	password: env.DATABASE_PASSWORD,
	port: env.DATABASE_PORT,
	user: env.DATABASE_USERNAME,
});
