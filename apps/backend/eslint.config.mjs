// @ts-check
import globals from "globals"
import tseslint from "typescript-eslint";
import base from "../../eslint.config.mjs"

export default tseslint.config(
	...base,
	{
		ignores: ["eslint.config.mjs"],
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: "commonjs",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
		},
	},
);
