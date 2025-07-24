import type { Config } from "jest";

import e2e from "./jest.e2e.config";

export default {
	...e2e,
	testRegex: "\\.e2e\\.steps\\.spec\\.ts",
} satisfies Config;
