"use client";

import { FieldPath, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
	Category,
	CreateCategoryMutation,
	CreateCategoryMutationRequest,
	createCategoryMutationRequestSchema,
	OpenAPIValidationError
} from "@/gen";
import { ErrorResponse, SuccessResponse } from "@/shared/api/client";
import { createCategoryPage } from "@/shared/app.config";
import React from "react";
import { toast } from "sonner";

const pageConfig = createCategoryPage

type Props = {
	createCategory: (
		category: Category,
	) => Promise<
		| SuccessResponse<CreateCategoryMutation["Response"]>
		| ErrorResponse<CreateCategoryMutation["Errors"]>
	>;
};

const toReactHookFormError = <T extends FieldValues>(error: OpenAPIValidationError) => ({
	...error,
	errors: error.errors.map(e => ({...e, path: e.path.replace("/body/","") as FieldPath<T>}))
})

export function CreateCategoryForm({ createCategory }: Props) {
	const form = useForm<CreateCategoryMutationRequest>({
		resolver: zodResolver(createCategoryMutationRequestSchema),
		defaultValues: {
			name: "",
			description: ""
		},
	});

	const onSubmit: SubmitHandler<CreateCategoryMutationRequest> = async (
		data,
	) => {
		const result = await createCategory(data);

		if (result.status === "ERROR") {
			if ("code" in result && result.code === "BODY_VALIDATION_EXCEPTION") {
				toReactHookFormError<CreateCategoryMutationRequest>(result).errors.forEach((e) => form.setError(e.path, e))
				return;
			}

			toast.error(result.message);
			return;
		}

		toast.success(result.message);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{pageConfig.nameInput.properties.labelText.value}</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage {...pageConfig.nameMessage.attributes} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{pageConfig.descriptionInput.properties.labelText.value}</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage {...pageConfig.descriptionMessage.attributes} />
						</FormItem>
					)}
				/>
				<Button type="submit">{pageConfig.submit.properties.text.value}</Button>
			</form>
		</Form>
	);
}
