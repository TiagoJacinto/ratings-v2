import { config } from "dotenv";
import { cleanEnv, host, port, str } from "envalid";

export const validateEnv = (config: Record<string, unknown>) =>
	cleanEnv(config, {
		DATABASE_HOST: host({
			default: "localhost",
			desc: "The host of the database",
		}),
		DATABASE_PORT: port({
			desc: "The port of the database",
		}),
		DATABASE_USERNAME: str({
			desc: "The username to connect to the database",
		}),
		DATABASE_PASSWORD: str({
			desc: "The password to connect to the database",
		}),
		DATABASE_NAME: str({
			desc: "The name of the database",
		}),
	});

export function loadEnv() {
	config();

	return validateEnv(process.env);
}
