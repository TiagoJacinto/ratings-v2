import { generateCodeFromFeature } from "../src/utils";

const path = process.argv[2];
if (!path) throw new Error("Pass a path argument");

const code = generateCodeFromFeature(path, {
	type: "snippets",
});

console.log(code);
