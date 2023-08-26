import { Collection, Entity, Index, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { Comment } from "./Comment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

@Entity()
@Index({ properties: [ "name"] })
export class User extends BaseEntity {
  @Property({ unique: true })
  name!: string;

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

  constructor (name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async matchPassword (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.hashedPassword);
  }

  getSignedJwtToken (): string {
    return jwt.sign({ id: this.id, username: this.name }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
  }
}
