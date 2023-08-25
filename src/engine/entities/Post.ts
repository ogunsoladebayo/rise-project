import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
	@Property({ columnType: "text"})
	title!: string;

	@Property({ columnType: "text"})
	body!: string;

	@ManyToOne(() => User, { ref: true, nullable: false })
	author!: Rel<User>;

	constructor (title: string, content: string) {
		super();
		this.title = title;
		this.body = content;
	}
}
