import personal from "@tiagojacinto/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	personal.configs.recommended({
		extensions: {
			withProjectService: true,
		},
		plugins: {
			languages: {
				typescript: true,
				react: true,
			},
			formatting: {
				perfectionist: true,
			},
		},
	}),
);
