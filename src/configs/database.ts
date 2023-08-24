import { EntityManager, MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export class Database {
	static orm: MikroORM;
	static em: EntityManager;

	public static async connect () {
		 this.orm = await MikroORM.init<PostgreSqlDriver>({
			driver: PostgreSqlDriver,
			entities: [ './dist/engine/entities' ],
			entitiesTs: [ './src/engine/entities' ],
			migrations: {
				path: "./dist/migrations",
				pathTs: "./src/migrations",
				disableForeignKeys: false
			}
		});
		console.log("Database connected".green);
	}

	public static async migrate () {
		const migrator = this.orm.getMigrator();
		await migrator.createMigration();
		await migrator.up();
	}
}