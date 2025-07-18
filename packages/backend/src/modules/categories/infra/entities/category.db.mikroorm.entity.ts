import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

type Props = {
  name: string;
  description?: string;
};

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  constructor({ name, description }: Props) {
    this.name = name;
    this.description = description;
  }
}
