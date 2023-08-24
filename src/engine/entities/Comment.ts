import { ManyToOne, Property } from "@mikro-orm/core";
import { Post } from "./Post";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class Comment extends BaseEntity {
	@Property()
	content!: string;

	@ManyToOne(() => Post, { ref: true, nullable: false })
	post!: Post;

	@ManyToOne(() => User, { ref: true, nullable: false })
	author!: User;
}