import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// PROXY RMQ
import { ClientProxyRmq } from '../proxy-rmq/client-proxy-rmq';

// DTO's
import { CreateShoppingCartDto } from './dtos/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dtos/update-shopping-cart.dto';

// INTERFACES
import { ShoppingCart } from './interfaces/shopping-cart.interface';

@Injectable()
export class ShoppingCartService {
	private logger = new Logger(`API-GATEWAY: ${ShoppingCartService.name}`);
	private microShoppingCartClient: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRmq) {
		this.microShoppingCartClient = this.clientProxyRmq.clientMicroShoppingCart;
	}

	public createShoppingCart(
		createShoppingCartDto: CreateShoppingCartDto,
	): Observable<{
		message: string;
	}> {
		this.logger.log(
			`Create ShoppingCart - Payload: ${JSON.stringify(
				createShoppingCartDto,
			)}`,
		);

		return this.microShoppingCartClient
			.emit('create-shopping-cart', createShoppingCartDto)
			.pipe(
				switchMap(() => of({ message: 'Shopping Cart created' })),
				catchError((error) => throwError(error)),
			);
	}

	public addProduct(
		userId: Types.ObjectId,
		updateShoppingCartDto: UpdateShoppingCartDto,
	) {
		this.logger.log(
			`Add ShoppingCart - Payload: ${JSON.stringify(
				updateShoppingCartDto,
			)}`,
		);

		return this.microShoppingCartClient
			.emit('update-shopping-cart', { userId, ...updateShoppingCartDto })
			.pipe(
				switchMap(() => of({ message: 'Shopping Cart updated' })),
				catchError((error) => throwError(error)),
			);
	}

	public removeProduct(
		userId: Types.ObjectId,
		updateShoppingCartDto: UpdateShoppingCartDto,
	) {
		this.logger.log(
			`Remove ShoppingCart - Payload: ${JSON.stringify(
				updateShoppingCartDto,
			)}`,
		);

		return this.microShoppingCartClient
			.emit('update-shopping-cart', { userId, ...updateShoppingCartDto })
			.pipe(
				switchMap(() => of({ message: 'Shopping Cart updated' })),
				catchError((error) => throwError(error)),
			);
	}

	public getShoppingCart(shoppingCartId: Types.ObjectId) {
		this.logger.log(`Get ShoppingCart`);

		return this.microShoppingCartClient
			.send('get-shopping-cart', shoppingCartId)
			.pipe(
				map((data) => {
					const shoppingCart: ShoppingCart = {
						userId: data.userId,
						itemsQuantity: data.itemsQuantity,
						totalPrice: data.totalPrice,
						products: data.products,
					};

					return shoppingCart;
				}),
				catchError((error) => throwError(error)),
			);
	}
}
