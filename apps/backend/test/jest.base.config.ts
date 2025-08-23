import type { Config } from "jest";

import { pathsToModuleNameMapper } from "ts-jest";
import { configs } from "@tiagojacinto/jest-config";

import { compilerOptions } from "../tsconfig.json";

export default {
	...configs.node,
	moduleFileExtensions: ["js", "json", "ts"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/../",
	}),
	rootDir: ".",
	testEnvironment: "node",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
} satisfies Config;
