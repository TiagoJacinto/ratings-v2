import type { Config } from "jest";

import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "../tsconfig.json";

export default {
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "../../../",
	}),
	rootDir: ".",
	testEnvironment: "node",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
} satisfies Config;
