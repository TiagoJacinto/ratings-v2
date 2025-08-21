import z from "zod/v4";
import { autoBindSteps, defineFeature } from "../utils";

export const CategoryName = z.string().readonly();

const createCategoryFeatureName = "create-category";

export const testCreateCategory = defineFeature(createCategoryFeatureName);

export const autoBindCreateCategorySteps = autoBindSteps(
	createCategoryFeatureName,
);
