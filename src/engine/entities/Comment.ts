import { Entity, Index, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { Post } from "./Post";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
@Index({ properties: [ "createdAt"] })
export class Comment extends BaseEntity {
  @Property({ columnType: "text"})
  content!: string;

  @ManyToOne(() => Post, { ref: true, nullable: false })
  post!: Post;

  @ManyToOne(() => User, { ref: true, nullable: false, index: true })
  author!: Rel<User>;


  constructor (content: string) {
    super();
    this.content = content;
  }
}