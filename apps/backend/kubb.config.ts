import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

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
  ],
  root: ".",
});
