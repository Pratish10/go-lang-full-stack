import "@testing-library/jest-dom";
import { server } from "./tests/mocks/server";

// mock server start
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
