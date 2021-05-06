import { catchError } from 'rxjs/operators';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

// SERVICES
import { ShoppingCartService } from './shopping-cart.service';

// DTO's
import { CreateShoppingCartDto } from './dtos/create-shopping-cart.dto';

// ENTITIES
import { ShoppingCart } from '../database/entities/shopping-cart.entity';

@Controller('shopping-carts')
export class ShoppingCartController {
	constructor(private readonly shoppingCartService: ShoppingCartService) {}

	@MessagePattern('create-shopping-cart')
	public createShoppingCart(
		createShoppingCartDto: CreateShoppingCartDto,
	): Observable<ShoppingCart> {
		return this.shoppingCartService
			.createShoppingCart(createShoppingCartDto)
			.pipe(catchError((error) => throwError(error)));
	}
}
