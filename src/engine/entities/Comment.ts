import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { Post } from "./Post";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
  @Property({ columnType: "text"})
  content!: string;

  @ManyToOne(() => Post, { ref: true, nullable: false })
  post!: Post;

  @ManyToOne(() => User, { ref: true, nullable: false })
  author!: Rel<User>;

  constructor (content: string) {
    super();
    this.content = content;
  }
}