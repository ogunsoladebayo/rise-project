import * as colors from "colors";
import app from "./app";
import { checkEnvs } from "./utils";

colors.setTheme({
  success: "green",
  error: "red",
  warn: "yellow",
  info: "blue",
});
colors.enable();

// set the port
const port = process.env.NODE_ENV && Number.isInteger(parseInt(process.env.PORT)) ? process.env.PORT : "3000";

// verify environment variables
const ENV_VARS = [
  "MIKRO_ORM_HOST",
  "MIKRO_ORM_PORT",
  "MIKRO_ORM_USER",
  "MIKRO_ORM_PASSWORD",
  "MIKRO_ORM_DB_NAME",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];
checkEnvs(ENV_VARS);

// create a http server
const server = app.listen(port, () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${ address }` : `port: ${ port }`;
  // eslint-disable-next-line no-console
  console.log(`Running in ${ process.env.NODE_ENV || "dev" } mode on ${ bind }`.inverse.green);
});
