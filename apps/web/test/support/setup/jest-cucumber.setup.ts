import { setJestCucumberConfiguration } from "jest-cucumber";

setJestCucumberConfiguration({
	runner: {
		describe,
		test,
	},
});
