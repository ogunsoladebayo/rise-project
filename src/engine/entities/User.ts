import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { Comment } from "./Comment";
import bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity {
  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true, persist: false })
  set password (value: string) {
    const salt = bcrypt.genSaltSync(10);
    this.hashedPassword = bcrypt.hashSync(value, salt);
  }

  @Property({ hidden: true })
  hashedPassword?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);

  @OneToMany(() => Comment, (comment) => comment.author)
  comments = new Collection<Comment>(this);

  constructor (username: string, email: string, password: string) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
