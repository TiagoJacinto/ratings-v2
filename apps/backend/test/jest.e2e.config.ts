import type { Config } from "jest";

import base from "./jest.base.config";

export default {
	...base,
	maxWorkers: 1,
	testRegex: "\\.e2e(\\.[a-zA-Z0-9\\.]*)?\\.spec\\.ts",
} satisfies Config;
