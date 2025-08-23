export async function register() {
	if (
		process.env.NEXT_RUNTIME === "nodejs" &&
		process.env.ENV === "development"
	) {
		const { default: initMock } = await import("./shared/api/mocks/initMock");

		const mock = await initMock();

		mock.start();
	}
}
