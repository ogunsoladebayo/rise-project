import errorHandler from "../../../src/engine/middlewares/error";

const mockResponse = () => {
	const res = {
		status: undefined,
		json: undefined
	};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe("errorHandler", () => {
	const res = mockResponse();

	test("sets the status code to 500 if no status code is provided", () => {
		const err = { message: "This is an error" };


		errorHandler(err, undefined, res, undefined);

		expect(res.status).toHaveBeenCalledWith(500);
	});

	test("sets the status code to the provided status code if it is provided", () => {
		const err = { message: "This is an error" };
		const statusCode = 400;

		const res = mockResponse().status(statusCode);

		errorHandler(err, undefined, res, undefined);

		expect(res.status).toHaveBeenCalledWith(statusCode);
	});
});