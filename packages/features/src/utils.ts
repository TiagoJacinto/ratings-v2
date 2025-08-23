import type {
	ScenariosDefinitionCallbackFunction,
	StepsDefinitionCallbackFunctionWithContext,
} from "jest-cucumber/dist/src/feature-definition-creation";
import type { LiteralUnion, SetFieldType } from "type-fest";

import { readFileSync } from "node:fs";
import {
	type Options as BaseOptions,
	autoBindSteps as baseAutoBindSteps,
	defineFeature as baseDefineFeature,
	generateCodeFromFeature as baseGenerateCodeFromFeature,
	loadFeature as baseLoadFeature,
	parseFeature as baseParseFeature,
} from "jest-cucumber";
import path from "node:path";

export const featuresBasePath = path.join(
	__dirname,
	"../../../docs/guess-points/2-solution/outputs/3-acceptance-criteria",
);

type Filter = "frontend" | "backend";

export type TagFilter = LiteralUnion<`@${Filter}`, string>;

type Options = SetFieldType<BaseOptions, "tagFilter", TagFilter>;

const getFeaturePath = (featureName: string) =>
	`${featuresBasePath}/${featureName}.feature`;

export const parseFeature = (featureText: string, options?: Options) =>
	baseParseFeature(featureText, options);

export const loadFeature = (featureName: string, options?: Options) =>
	baseLoadFeature(getFeaturePath(featureName), options);

export const defineFeature =
	(featureName: string) =>
	(
		scenariosDefinitionCallback: ScenariosDefinitionCallbackFunction,
		options?: Options,
	) =>
		baseDefineFeature(
			loadFeature(featureName, options),
			scenariosDefinitionCallback,
		);

export const autoBindSteps =
	(featureName: string) =>
	(
		stepDefinitions: StepsDefinitionCallbackFunctionWithContext<
			NonNullable<unknown>
		>[],
		options?: Options,
	) =>
		baseAutoBindSteps(loadFeature(featureName, options), stepDefinitions);

export function generateCodeFromFeature(
	featureName: string,
	options?: Options & { type?: "snippets" | "steps" },
) {
	const path = getFeaturePath(featureName);
	const fileContent = readFileSync(path, "utf8");

	let result = "";

	const lines = fileContent.split("\n");

	const feature = parseFeature(fileContent, options);

	for (let i = 0; i <= lines.length; i++) {
		const c = baseGenerateCodeFromFeature(feature, i);

		const shouldIgnore =
			!c ||
			(options?.type === "steps" && c.startsWith("test")) ||
			(options?.type === "snippets" && !c.startsWith("test"));
		if (shouldIgnore) continue;

		result += c;
		result += "\n";
	}

	return result;
}
