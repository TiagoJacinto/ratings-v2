import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type Props = {
	name: string;
	description?: string;
};

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("varchar", { length: 100 })
	name!: string;

	@Column({ nullable: true, type: "text" })
	description?: string;

	static create(props: Props) {
		const category = new Category();
		category.name = props.name;
		category.description = props.description;

		return category;
	}
	private constructor() {}
}
