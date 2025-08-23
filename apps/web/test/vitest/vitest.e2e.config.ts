import { defineConfig } from "vitest/config";
import base from "./vitest.base.config";
import merge from "deepmerge";
import path from "path";

export default merge(
	base,
	defineConfig({
		test: {
			include: ["**/*.e2e*.spec.ts"],
		},
	}),
);
