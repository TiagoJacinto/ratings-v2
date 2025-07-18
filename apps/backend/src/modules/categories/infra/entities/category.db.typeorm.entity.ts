import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type Props = {
  name: string;
  description?: string;
};

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  private constructor() {}
  static create(props: Props) {
    const category = new this();
    category.name = props.name;
    category.description = props.description;

    return category;
  }
}
