const errorHandler = (err: any, _req: any, res: any, _next: any) => {
	let error = { ...err };

	error.message = err.message;

	// Log to console for dev
	console.log(err);


	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	});
};

export default errorHandler;
