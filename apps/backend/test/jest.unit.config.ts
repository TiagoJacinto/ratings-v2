import type { Config } from "jest";

import base from "./jest.base.config";

export default {
	...base,
	testRegex: "\\.unit(\\.[a-zA-Z0-9\\.]*)?\\.spec\\.ts",
} satisfies Config;
