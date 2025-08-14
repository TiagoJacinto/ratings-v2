import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginMsw } from "@kubb/plugin-msw";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginFaker } from "@kubb/plugin-faker"

export default defineConfig({
	input: {
		path: require.resolve("@repo/contract/tsp-output/schema/openapi.1.0.yaml"),
	},
	output: {
		barrelType: "all",
		clean: true,
		extension: {
			".ts": "",
		},
		path: "./src/gen",
	},
	plugins: [
		pluginOas(),
		pluginTs({
			unknownType: "unknown",
		}),
		pluginZod({
			unknownType: "unknown",
		}),
		pluginFaker({
			unknownType:"unknown",
		}),
		pluginMsw({
			baseURL: "http://localhost:8080",
			handlers: true,
			parser: "faker",
		}),
		pluginClient({
			baseURL: "http://localhost:8080",
			dataReturnType: "full",
			importPath: "@/client.ts",
			operations: true,
		}),
	],
	root: ".",
});
