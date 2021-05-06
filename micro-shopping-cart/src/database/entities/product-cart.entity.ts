import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

// ENTITIES
import { ShoppingCart } from './shopping-cart.entity';

@Entity()
export class ProductCart {
	@PrimaryColumn()
	public id: string;

	@Column('int')
	public quantity: number;

	@ManyToOne(() => ShoppingCart, (cart) => cart.products)
	public cart: ShoppingCart;
}
