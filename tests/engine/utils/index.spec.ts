import { checkEnvs } from "../../../src/utils";

describe("checkEnvs()", () => {
	test("throws an error if a required environment variable is missing", () => {
		const ENV_VARS = [ "PORT" ];

		expect(() => {
			checkEnvs(ENV_VARS);
		}).toThrowError("ERROR: Missing the required environment variable PORT");
	});

	test("does not throw an error if all required environment variables are present", () => {
		const ENV_VARS = [ "PORT", "NODE_ENV" ];
		process.env.PORT = "3000";
		process.env.NODE_ENV = "test";

		checkEnvs(ENV_VARS);
	});
});
