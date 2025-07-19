import { loadEnv } from "@/shared/config/env.validation";
import { getMikroORMConfig } from "./utils/getMikroORMConfig";

const env = loadEnv();
export default getMikroORMConfig({
	host: env.DATABASE_HOST,
	port: env.DATABASE_PORT,
	user: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	dbName: env.DATABASE_NAME,
});
