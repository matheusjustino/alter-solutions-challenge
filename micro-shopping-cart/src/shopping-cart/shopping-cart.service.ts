import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable, Logger } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';

// PROXY RMQ
import { ClientProxyRmq } from '../proxy-rmq/client-proxy-rmq';

// ENTITIES
import { ShoppingCart } from '../database/entities/shopping-cart.entity';
import { ProductCart } from '../database/entities/product-cart.entity';

// DTO's
import { CreateShoppingCartDto } from './dtos/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dtos/update-shopping-cart.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';

interface Product {
	_id: any;
	price: number;
}

@Injectable()
export class ShoppingCartService {
	private logger = new Logger(
		`MICRO-SHOPPING-CART: ${ShoppingCartService.name}`,
	);
	private microProductClient: ClientProxy = null;

	constructor(
		@InjectRepository(ShoppingCart)
		private readonly shoppingProductRepository: Repository<ShoppingCart>,
		private readonly clientProxyRmq: ClientProxyRmq,
	) {
		this.microProductClient = this.clientProxyRmq.clientMicroProduct;
	}

	public createShoppingCart(
		createShoppingCartDto: CreateShoppingCartDto,
	): Observable<ShoppingCart> {
		this.logger.log(
			`Create Shopping Cart - Payload: ${JSON.stringify(
				createShoppingCartDto,
			)}`,
		);

		const shoppingCart = { ...createShoppingCartDto, products: [] };

		return from(this.shoppingProductRepository.save(shoppingCart)).pipe(
			catchError((error) => throwError(error)),
		);
	}

	public addProduct(updateShoppingCartDto: UpdateShoppingCartDto) {
		let finalShoppingCart: ShoppingCart = null;

		return from(
			this.shoppingProductRepository.findOne(
				updateShoppingCartDto.shoppingCartId,
			),
		).pipe(
			switchMap((shoppingCart) => {
				if (!shoppingCart) {
					throw new RpcException('Shopping Cart Not Found');
				}

				finalShoppingCart = shoppingCart;
				return from(
					this.clientProxyRmq.clientMicroProduct.send(
						'get-product-by-id',
						updateShoppingCartDto.shoppingCartId,
					),
				);
			}),
			map((product: Product) => {
				if (!product) {
					throw new RpcException('Product Not Found');
				}

				const hasProduct = finalShoppingCart.products.find(
					(productCart) => productCart.id === product._id,
				);

				if (hasProduct) {
					hasProduct.quantity += 1;
					return from(
						this.shoppingProductRepository.update(
							hasProduct.id,
							hasProduct,
						),
					);
				}
			}),
		);
	}

	private updateShoppingCart(product: ProductCart) {
		// return from(this.shoppingProductRepository.update(product.id, product));
	}
}
