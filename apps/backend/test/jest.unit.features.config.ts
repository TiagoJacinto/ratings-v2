import type { Config } from "jest";

import unit from "./jest.unit.config";

export default {
	...unit,
	testRegex: "\\.unit\\.steps\\.spec\\.ts",
} satisfies Config;
