import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { HttpHandler } from "msw";

export class MockProxyServer {
	private readonly app = new Elysia({ adapter: node() }).all(
		"*",
		async ({ request }) => {
			if (!this.interceptor) return;

			const result = await this.interceptor.run({
				request,
				requestId: Date.now().toString(),
			});

			if (result && result.response) return result.response;
		},
	);

	private interceptor?: HttpHandler;

	mockResponse(interceptor: HttpHandler) {
		this.interceptor = interceptor;
	}

	start() {
		this.app.listen(8080);
	}

	async stop() {
		await this.app.stop();
	}
}
