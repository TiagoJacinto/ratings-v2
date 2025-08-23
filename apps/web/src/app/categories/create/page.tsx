import { CreateCategoryForm } from "./form";
import { revalidateTag } from "next/cache";
import { createCategory } from "@/gen";

export default function CreateCategoryPage() {
	return (
		<CreateCategoryForm
			createCategory={async (data) => {
				"use server";

				const result = await createCategory(data);
				if (result.status === "ERROR") return result;

				revalidateTag("categories");
				return result;
			}}
		/>
	);
}
