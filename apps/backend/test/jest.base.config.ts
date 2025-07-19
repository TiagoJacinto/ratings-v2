import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "../tsconfig.json";

export default {
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "../../../",
	}),
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: ".",
	testEnvironment: "node",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
} satisfies Config;
