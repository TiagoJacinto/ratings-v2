import mergeDeep from "deepmerge";

export type RequestConfig<TData = unknown> = Omit<RequestInit, "body"> & {
	data?: TData | FormData;
	method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
	params?: object;
	responseType?:
		| "arraybuffer"
		| "blob"
		| "document"
		| "json"
		| "text"
		| "stream";
	url: string;
};

export type SuccessResponse<TData = unknown> = TData & { status: "SUCCESS" };
export type ErrorResponse<TError = unknown> = TError & { status: "ERROR" };

export type ResponseConfig<TData = unknown, TError = unknown> =
	| SuccessResponse<TData>
	| ErrorResponse<TError>;

export type ResponseErrorConfig<TError = unknown> = TError;

export const client = async <TData, TError = unknown, TVariables = unknown>(
	config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData, TError>> => {
	const response = await fetch(
		config.url,
		mergeDeep(config, {
			body: JSON.stringify(config.data),
			headers: {
				"Content-Type": "application/json",
			},
			method: config.method.toUpperCase(),
		}),
	);

	const result = await response.json();

	if (!response.ok) {
		return {
			...(result as TError),
			status: "ERROR",
		};
	}

	return {
		...(result as TData),
		status: "SUCCESS",
	};
};

export default client;
