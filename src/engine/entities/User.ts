import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class User extends BaseEntity {
	@Property({ unique: true })
	username!: string;

	@Property({ unique: true })
	email!: string;

	@Property({ hidden: true })
	hashedPassword?: string;

	@OneToMany(() => Post, (post) => post.author)
	posts = new Collection<Post>(this);

	@OneToMany(()=> Comment, (comment) => comment.author)
	comments = new Collection<Comment>(this);

	constructor (username: string, email: string) {
		super();
		this.username = username;
		this.email = email;
	}
}
