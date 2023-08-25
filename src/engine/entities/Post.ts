import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
	@Property()
	title!: string;

	@Property()
	body!: string;

	@ManyToOne(() => User, { ref: true, nullable: false })
	author!: Rel<User>;

	constructor (title: string, content: string) {
		super();
		this.title = title;
		this.body = content;
	}
}
