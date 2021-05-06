import { Types } from 'mongoose';

// INTERFACES
import { Product } from '../../product/interfaces/product.interface';

export interface ShoppingCart {
	userId: Types.ObjectId;
	totalPrice: number;
	itemsQuantity: number;
	products: Product[];
}
