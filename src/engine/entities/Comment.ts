import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Post } from "./Post";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
	@Property()
	content!: string;

	@ManyToOne(() => Post, { ref: true, nullable: false })
	post!: Post;

	@ManyToOne(() => User, { ref: true, nullable: false })
	author!: User;
}