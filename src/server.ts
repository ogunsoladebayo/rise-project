import colors from "colors";
import app from "./app";

colors.setTheme({
	success: "green",
	error: "red",
	warn: "yellow",
	info: "blue"
});
colors.enable();

// set the port
const port = process.env.NODE_ENV && Number.isInteger(parseInt(process.env.PORT)) ? process.env.PORT : "3000";

// verify environment variables
const ENV_VARS = []
ENV_VARS.forEach(function (key) {
	if (!process.env[ key ]) {
		console.error("ERROR: Missing the required environment variable " + key);
		process.exit(1);
	}
});

// create a http server
const server = app.listen(port, () => {
	const address = server.address();
	const bind = typeof address === "string" ? `pipe ${ address }` : `port: ${ port }`;
	// eslint-disable-next-line no-console
	console.log(`Running in ${ process.env.NODE_ENV || "dev" } mode on ${ bind }`.inverse.green);
});
