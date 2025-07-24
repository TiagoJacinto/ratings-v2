import personal from "@tiagojacinto/eslint-config";
//@ts-ignore
import biome from "eslint-config-biome";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	biome,
	personal.configs.recommended({
		extensions: {
			with: {
				projectService: true,
				biome: true,
			},
		},
		plugins: {
			languages: {
				typescript: true,
				react: true,
			},
			formatting: {
				perfectionist: true,
			},
			build: {
				turbo: true,
			},
			testing: {
				jest: true,
			},
		},
	}),
	{
		rules: {
			"sonarjs/no-empty-test-file": "off",
		},
	},
);
