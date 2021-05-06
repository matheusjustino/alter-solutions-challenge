import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

// ENTITIES
import { ProductCart } from './product-cart.entity';

interface IProductCart {
	id: string;
	quantity: number;
}

@Entity()
export class ShoppingCart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: string;

	@OneToMany(() => ProductCart, (product) => product.cart)
	@Column()
	products: ProductCart[];
}
