import { defineConfig } from "vitest/config";

import e2e from "./vitest.e2e.config";
import merge from "deepmerge";
import path from "path";

export default merge.all([
	e2e,
	defineConfig({
		test: {
			include: ["**/*.e2e.steps.spec.ts"],
			setupFiles: [
				path.join(
					import.meta.dirname,
					"../support/setup/jest-cucumber.setup.ts",
				),
			],
		},
	}),
]);
