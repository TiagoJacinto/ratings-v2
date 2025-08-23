import { defineConfig } from "vitest/config";

import unit from "./vitest.unit.config";
import merge from "deepmerge";
import path from "path";

export default merge.all([
	unit,
	defineConfig({
		test: {
			include: ["**/*.unit.steps.spec.ts"],
			setupFiles: [
				path.join(
					import.meta.dirname,
					"../support/setup/jest-cucumber.setup.ts",
				),
			],
		},
	}),
]);
