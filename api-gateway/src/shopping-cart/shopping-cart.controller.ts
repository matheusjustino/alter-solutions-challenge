import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Types } from 'mongoose';

// SERVICES
import { ShoppingCartService } from './shopping-cart.service';

// DTO's
import { CreateShoppingCartDto } from './dtos/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dtos/update-shopping-cart.dto';

// INTERFACES
import { ShoppingCart } from './interfaces/shopping-cart.interface';

// PIPES
import { ObjectIdTransformPipe } from '../common/pipes/object-id-transform.pipe';

// GUARDS
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('shopping-carts')
export class ShoppingCartController {
	constructor(private readonly shoppingCartService: ShoppingCartService) {}

	@Post()
	public createShoppingCart(
		@Body() createShoppingCart: CreateShoppingCartDto,
	): Observable<{
		message: string;
	}> {
		return this.shoppingCartService
			.createShoppingCart(createShoppingCart)
			.pipe(catchError((error) => throwError(error)));
	}

	@Put(':userId')
	public addProduct(
		@Param('userId', ObjectIdTransformPipe) userId: Types.ObjectId,
		@Body() updateShoppingCartDto: UpdateShoppingCartDto,
	): Observable<{
		message: string;
	}> {
		return this.shoppingCartService
			.addProduct(userId, updateShoppingCartDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@Put(':userId')
	public removeProduct(
		@Param('userId', ObjectIdTransformPipe) userId: Types.ObjectId,
		@Body() updateShoppingCartDto: UpdateShoppingCartDto,
	): Observable<{
		message: string;
	}> {
		return this.shoppingCartService
			.removeProduct(userId, updateShoppingCartDto)
			.pipe(catchError((error) => throwError(error)));
	}

	@Get(':shoppingCartId')
	public getShoppingCart(
		@Param('shoppingCartId', ObjectIdTransformPipe)
		shoppingCartId: Types.ObjectId,
	): Observable<ShoppingCart> {
		return this.shoppingCartService
			.getShoppingCart(shoppingCartId)
			.pipe(catchError((error) => throwError(error)));
	}
}
