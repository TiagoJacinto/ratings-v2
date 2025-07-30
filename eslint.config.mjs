import personal from "@tiagojacinto/eslint-config";
//@ts-ignore
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
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
