import { defineConfig } from "vitest/config";
import base from "./vitest.base.config";
import merge from "deepmerge";
import path from "path";

export default merge(
	base,
	defineConfig({
		test: {
  		environment: "jsdom",
			include: ["**/*.unit*.spec.ts"],
			setupFiles: [
				path.join(
					import.meta.dirname,
					"../support/setup/mock-backend.setup.ts",
				),
			],
      browser: {
        enabled: false,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
        ],
      },
		},
	}),
);
