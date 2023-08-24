export function checkEnvs (vars: string[]) {
	vars.forEach(key => {
		if (!process.env[ key ]) {
			throw new Error("ERROR: Missing the required environment variable " + key);
			// console.error("ERROR: Missing the required environment variable " + key);
			// process.exit(1);
		}
	});
}