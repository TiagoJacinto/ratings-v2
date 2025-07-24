import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

type Props = {
	name: string;
	description?: string;
};

@Entity()
export class Category {
	@PrimaryKey()
	id!: number;

	@Property({
		length: 100,
		type: "varchar",
	})
	name: string;

	@Property({ nullable: true, type: "text" })
	description?: string;

	constructor({ name, description }: Props) {
		this.name = name;
		this.description = description;
	}
}
