import app from "../src/app";
import * as http from "http";

describe("app.listen()", () => {
	let server: http.Server;
	test("creates a http server", () => {
		server = app.listen(3000, () => {
			expect(server).toBeInstanceOf(http.Server);
		});
	});
	afterAll(() => {
		server.close();
	});
});