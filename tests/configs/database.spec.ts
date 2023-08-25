import { EntityRepository } from '@mikro-orm/core';
import { Database } from "../../src/configs/database";
import { Comment, Post, User } from "../../src/engine/entities";

describe('Database', () => {
  let database: Database;

  beforeAll(async () => {
    // Initialize the database before running tests
    database = new Database();
    await database.connect();
  });

  afterAll(async () => {
    // Close the database connection after tests
    await database.orm.close();
  });

  test('should connect to the database', () => {
    expect(database.orm.isConnected()).toBeTruthy();
  });

  test('should migrate the database', async () => {
    await database.migrate();
    const migrator = database.orm.getMigrator();
    const executedMigrations = await migrator.getExecutedMigrations();
    expect(executedMigrations.length).toBeGreaterThan(0);
  });

  test('should have injected repositories', () => {
    database.injectRepositories();
    expect(database.userRepository).toBeInstanceOf(EntityRepository<User>);
    expect(database.postRepository).toBeInstanceOf(EntityRepository<Post>);
    expect(database.commentRepository).toBeInstanceOf(EntityRepository<Comment>);
  });
});
