import z from "zod/v4";
import { autoBindSteps, defineFeature } from "../utils";

export const CreateCategoryDataTableSchema = z
	.object({
		name: z.string(),
	})
	.array()
	.readonly();

export type CreateCategoryDataTable = z.infer<
	typeof CreateCategoryDataTableSchema
>;

const createCategoryFeatureName = "create-category";

export const testCreateCategory = defineFeature(createCategoryFeatureName);

export const autoBindCreateCategorySteps = autoBindSteps(
	createCategoryFeatureName,
);
