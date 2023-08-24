import { EntityManager, MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export class Database {
	public static async connect () {
		const orm = await MikroORM.init<PostgreSqlDriver>({
			driver: PostgreSqlDriver,
			entities: [ './dist/engine/entities' ],
			entitiesTs: [ './src/engine/entities' ],
		});
		console.log("Database connected".green);
	}

	public static DI = {} as {
		orm: MikroORM;
		em: EntityManager;
	};

}