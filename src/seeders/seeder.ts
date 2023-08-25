import { Comment, Post, User } from "../engine/entities";
import { Factory, Faker, Seeder } from "@mikro-orm/seeder";
import { EntityManager } from "@mikro-orm/core";

class UserFactory extends Factory<User> {
  model = User;

  definition (faker: Faker): Partial<User> {
    return {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}

class PostFactory extends Factory<Post> {
  model = Post;

  definition (faker: Faker): Partial<Post> {
    return {
      title: faker.lorem.words(3),
      body: faker.lorem.paragraphs(3),
    };
  }
}

class CommentFactory extends Factory<Comment> {
  model = Comment;

  definition (faker: Faker): Partial<Comment> {
    return {
      content: faker.lorem.sentence(3),
    };
  }
}

export class DatabaseSeeder extends Seeder {
  async run (em: EntityManager): Promise<void> {
    const userCount = await em.count(User);
    const postCount = await em.count(Post);
    const commentCount = await em.count(Comment);

    if (userCount > 10 || postCount > 20 || commentCount > 100) return;

    const users = new UserFactory(em).make(10 - userCount);

    const posts = new PostFactory(em).each((post) => {
      post.author = users[ Math.floor(Math.random() * users.length) ];
    }).make(20 - postCount);
    new CommentFactory(em).each((comment) => {
      comment.author = users[ Math.floor(Math.random() * users.length) ];
      comment.post = posts[ Math.floor(Math.random() * posts.length) ];
    }).make(100 - commentCount);
  }
}
