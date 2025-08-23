import { beforeAll, afterEach, afterAll } from "vitest";
import initMock from "@src/shared/api/mocks/initMock";

const mock = await initMock()

beforeAll(() => mock.start());
afterEach(() => mock.resetHandlers());
afterAll(() => mock.stop());
