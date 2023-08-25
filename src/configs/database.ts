import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Comment, Post, User } from "../engine/entities";

export class Database {
  public orm: MikroORM;
  public em: EntityManager;
  public userRepository: EntityRepository<User>
  public postRepository: EntityRepository<Post>
  public commentRepository: EntityRepository<Comment>

  public async connect () {
    try {
    this.orm = await MikroORM.init<PostgreSqlDriver>({
      driver: PostgreSqlDriver,
      entities: [ "./dist/engine/entities" ],
      entitiesTs: [ "./src/engine/entities" ],
      migrations: {
        path: "./dist/migrations",
        pathTs: "./src/migrations",
        disableForeignKeys: false,
      },
    });
    this.em = this.orm.em;
    console.log("Connected to the database");
    } catch (error) {
    console.log("Failed to connect to the database", error);
    }
  }

  public async migrate () {
    const migrator = this.orm.getMigrator();
    await migrator.createMigration();
    await migrator.up();
  }

  public injectRepositories () {
    this.userRepository = this.orm.em.getRepository(User);
    this.postRepository = this.orm.em.getRepository(Post);
    this.commentRepository = this.orm.em.getRepository(Comment);
  }
}