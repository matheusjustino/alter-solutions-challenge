import { Connection } from 'typeorm';

// ENTITY
import { ShoppingCart } from '../database/entities/shopping-cart.entity';

export const ShoppingCartProvider = [
	{
		provide: 'SHOPPING_CART_REPOSITORY',
		useFactory: (connection: Connection) =>
			connection.getRepository(ShoppingCart),
		inject: ['DATABASE_CONNECTION'],
	},
];
